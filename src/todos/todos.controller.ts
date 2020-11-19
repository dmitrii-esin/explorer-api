import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodosService } from './todos.service';
import { Todo } from './todo.interface';
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { RolesGuard } from '../common/guards/roles.guard';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @UseFilters(HttpExceptionFilter)
  @UseGuards(RolesGuard)
  async create(@Body(new ValidationPipe()) todo: CreateTodoDto): Promise<Todo> {
    return this.todosService.create(todo);
  }

  @Get()
  @UseFilters(HttpExceptionFilter)
  @UseGuards(RolesGuard)
  async findAll(): Promise<Todo[]> {
    return this.todosService.findAll();
  }

  @Get(':id')
  @UseFilters(HttpExceptionFilter)
  @UseGuards(RolesGuard)
  async findOne(@Param('id') id: string): Promise<Todo> {
    return this.todosService.findOne(id);
  }

  @Put(':id')
  @UseFilters(HttpExceptionFilter)
  @UseGuards(RolesGuard)
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) todo: UpdateTodoDto,
  ): Promise<Todo> {
    return this.todosService.update(id, todo);
  }

  @Delete(':id')
  @UseFilters(HttpExceptionFilter)
  @UseGuards(RolesGuard)
  async remove(@Param('id') id: string) {
    return this.todosService.remove(id);
  }
}
