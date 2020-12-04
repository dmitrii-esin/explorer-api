import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as helmet from 'helmet';
// import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';
import { Connection } from 'typeorm';
import * as Joi from '@hapi/joi';
import { CookieParserMiddleware } from '@nest-middlewares/cookie-parser';
import { logger } from './common/middlewares/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { TodosController } from './todos/todos.controller';
import { DatabaseModule } from './database.module';

const rateLimitMiddlewareOptions = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

@Module({
  imports: [
    TodosModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private connection: Connection) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        CookieParserMiddleware,
        helmet(),
        // TODO: resolver problem with csurf(): Error: misconfigured csrf
        rateLimitMiddlewareOptions,
        logger,
      )
      .forRoutes(TodosController);
  }
}
