import * as moment from 'moment';

export abstract class DeliveryDateStrategy {
    protected actualDate = moment(new Date()).utc().subtract(3, 'hours');

    abstract calculate(diff: number, userId: string): string;
}
