import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todosRepository: Repository<Todo>,
  ) {}

  private readonly todos: Todo[] = [];

  async create(todo: CreateTodoDto): Promise<Todo> {
    const newTodo = await this.todosRepository.create(todo);
    await this.todosRepository.save(newTodo);
    return newTodo;
  }

  findAll(): Promise<Todo[]> {
    return this.todosRepository.find();
  }

  async findOne(id: string): Promise<Todo> {
    const todo = await this.todosRepository.findOne(id);
    if (todo) {
      return todo;
    }
    throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
  }

  async update(id: string, todo: UpdateTodoDto): Promise<Todo> {
    await this.todosRepository.update(id, todo);
    const updatedTodo = await this.todosRepository.findOne(id);
    if (updatedTodo) {
      return updatedTodo;
    }
    throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
  }

  async remove(id: string): Promise<void> {
    const deleteResponse = await this.todosRepository.delete(id);

    if (!deleteResponse.affected) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}
