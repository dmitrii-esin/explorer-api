import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as helmet from 'helmet';
// import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Connection } from 'typeorm';
import { CookieParserMiddleware } from '@nest-middlewares/cookie-parser';
import { logger } from './common/middlewares/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { TodosController } from './todos/todos.controller';
// import { Todo as TodoEntity } from './todos/entities/todo.entity';

const rateLimitMiddlewareOptions = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: 'root',
    //   database: 'test',
    //   entities: [TodoEntity],
    //   //TODO:!!! Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
    //   synchronize: true,
    // }),
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  // constructor(private connection: Connection) {}

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
