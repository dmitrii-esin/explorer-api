import { v4 as uuidv4 } from 'uuid';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './todo.interface';

@Injectable()
export class TodosService {
  private readonly todos: Todo[] = [];

  create(todo: CreateTodoDto): Todo {
    const newTodo: Todo = {
      id: uuidv4(),
      text: todo.text,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: string): Todo {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      return todo;
    }
    throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
  }

  update(id: string, todo: UpdateTodoDto): Todo {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);
    if (todoIndex > -1) {
      this.todos[todoIndex] = todo;
      return todo;
    }
    throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
  }

  remove(id: string): string {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);
    if (todoIndex > -1) {
      this.todos.splice(todoIndex, 1);
      return `Todo ${id} was deleted`;
    } else {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }
  }
}
