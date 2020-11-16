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
import { Todo } from './interfaces/todo.interface';
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { RolesGuard } from '../common/guards/roles.guard';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @UseFilters(HttpExceptionFilter)
  @UseGuards(RolesGuard)
  async create(@Body(new ValidationPipe()) createTodoDto: CreateTodoDto) {
    this.todosService.create(createTodoDto);
  }

  @Get()
  @UseFilters(HttpExceptionFilter)
  async findAll(): Promise<Todo[]> {
    return this.todosService.findAll();
  }

  @Get(':id')
  @UseFilters(HttpExceptionFilter)
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(+id);
  }

  @Put(':id')
  @UseFilters(HttpExceptionFilter)
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  @UseFilters(HttpExceptionFilter)
  remove(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }
}
