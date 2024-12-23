import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: true,
    });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
        }),
    );

    app.enableShutdownHooks();

    await app.listen(process.env.PORT || 3333);
}
bootstrap();
