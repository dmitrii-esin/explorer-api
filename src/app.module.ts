import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import * as helmet from 'helmet';
// import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';
import { CookieParserMiddleware } from '@nest-middlewares/cookie-parser';
import { logger } from './middlewares/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { TodosController } from './todos/todos.controller';

const rateLimitMiddlewareOptions = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

@Module({
  imports: [TodosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
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
