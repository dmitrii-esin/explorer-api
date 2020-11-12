import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './interfaces/todo.interface';

@Injectable()
export class TodosService {
  private readonly todos: Todo[] = [];

  //TODO: разобраться как правильно работать с dto
  // create(createTodoDto: CreateTodoDto) {
  //   return 'This action adds a new todo';
  // }

  create(todo: Todo) {
    this.todos.push(todo);
  }

  // findAll() {
  //   return `This action returns all todos`;
  // }

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}