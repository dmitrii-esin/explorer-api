import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
// import { Todo as TodoEntity } from './entities/todo.entity';

@Module({
  // imports: [TypeOrmModule.forFeature([TodoEntity])],
  imports: [],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
