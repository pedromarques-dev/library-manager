import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import * as moment from 'moment';
import { MaxLimitDeliveryDateStrategy } from 'src/strategies/delivery-date/max-limit-delivery-date.strategy';
import { MediumLimitDeliveryDateStrategy } from 'src/strategies/delivery-date/medium-limit-delivery-data.strategy';
import { MinLimitDeliveryDateStrategy } from 'src/strategies/delivery-date/min-limit-delivery-date.strategy';
import { MaxValueFineStrategy } from 'src/strategies/fine/max-value-fine.strategy';
import { MediumValueFineStrategy } from 'src/strategies/fine/medium-value-fine.strategy';
import { MinValueFineStrategy } from 'src/strategies/fine/min-value-fine.strategy';
import { getRole } from 'src/utils/get-role';
import { getTokenUser } from 'src/utils/get-token-user';
import { BooksRepository } from '../books/repositories/books.repositories';
import { FinesRepository } from '../fines/repositories/fines.repository';
import { CreateBorrowingDto } from './dto/create-borrowing.dto';
import { ReturnBookDto } from './dto/update-borrowing.dto';
import { BorrowingRepository } from './repositories/borrowing.repository';

@Injectable()
export class BorrowingsService {
    constructor(
        private readonly borrowingsRepository: BorrowingRepository,
        private readonly booksRepository: BooksRepository,
        private readonly finesRepository: FinesRepository,
    ) {}

    async reserve(
        createBorrowingDto: CreateBorrowingDto,
        authorization: string,
    ) {
        const { bookId } = createBorrowingDto;

        const book = await this.booksRepository.findOne(bookId);

        const bookHasReserved = book.is_avaliable;

        if (!bookHasReserved) {
            throw new BadRequestException('Book has reserved.');
        }
        const userLogged = await getTokenUser(authorization);

        const userHasFine =
            await this.finesRepository.findFirstFine(userLogged);

        if (userHasFine) {
            throw new UnauthorizedException('You have unpaid fines');
        }

        const deliveryDate = this.calculateDeliveryDate(book.pages);

        await this.borrowingsRepository.reserve({
            book_id: bookId,
            delivery_date: deliveryDate,
            user_id: userLogged,
        });

        await this.booksRepository.updateAvailableStatus({
            is_available: false,
            book_id: bookId,
        });
    }

    async returnBook(returnBookDto: ReturnBookDto, authorization: string) {
        const { id } = returnBookDto;
        const actualDate = moment(new Date()).utc().subtract(3, 'hours');

        const borrowing = await this.borrowingsRepository.findOne(id);
        const userLogged = await getTokenUser(authorization);

        if (borrowing.user_id !== userLogged) {
            throw new UnauthorizedException(
                'Voce nao pode devolver esse livro.',
            );
        }

        const diffBetweenDeliveryDates = actualDate.diff(
            borrowing.delivery_date,
            'd',
        );

        if (actualDate.isAfter(borrowing.delivery_date)) {
            this.calculateFine(diffBetweenDeliveryDates, userLogged);
        }

        await this.borrowingsRepository.returnBook({
            id,
        });

        await this.booksRepository.updateAvailableStatus({
            is_available: true,
            book_id: borrowing.book_id,
        });
    }

    async findAllBorrowings(
        authorization: string,
        finishedAt?: string,
        userId?: string,
    ) {
        const userLogged = await getTokenUser(authorization);
        const userRole = await getRole(authorization);
        const isUser = userRole === 'USER';

        if (isUser && userId && userId !== userLogged) {
            throw new UnauthorizedException();
        }
        const borrowings = await this.borrowingsRepository.findAllBorrowings({
            userId: isUser ? userLogged : userId,
            finished_at: finishedAt === 'null' ? null : undefined,
        });

        return {
            borrowings,
        };
    }

    async findBorrowingById(id: string) {
        const borrowing =
            await this.borrowingsRepository.findOneBorrowingById(id);

        return {
            borrowing,
        };
    }

    private calculateDeliveryDate(page: number) {
        if (page <= 100) return new MinLimitDeliveryDateStrategy().calculate();

        if (page > 100 && page <= 250)
            return new MediumLimitDeliveryDateStrategy().calculate();

        if (page > 250) return new MaxLimitDeliveryDateStrategy().calculate();
    }

    private async calculateFine(days: number, userId: string) {
        const daysAbs = Math.abs(days);

        if (daysAbs <= 7) new MinValueFineStrategy().calculate(userId);

        if (daysAbs > 7 && daysAbs <= 20)
            new MediumValueFineStrategy().calculate(userId);

        if (daysAbs > 20) {
            const sumTotalValue = (daysAbs - 30) * 2 + 10;

            new MaxValueFineStrategy().calculate(userId, sumTotalValue);
        }
    }
}
