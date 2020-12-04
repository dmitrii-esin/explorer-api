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
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { RolesGuard } from '../common/guards/roles.guard';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @UseFilters(HttpExceptionFilter)
  @UseGuards(RolesGuard)
  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  @UseFilters(HttpExceptionFilter)
  @UseGuards(RolesGuard)
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  @UseFilters(HttpExceptionFilter)
  @UseGuards(RolesGuard)
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(id);
  }

  @Put(':id')
  @UseFilters(HttpExceptionFilter)
  @UseGuards(RolesGuard)
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) todo: UpdateTodoDto,
  ) {
    return this.todosService.update(id, todo);
  }

  @Delete(':id')
  @UseFilters(HttpExceptionFilter)
  @UseGuards(RolesGuard)
  async remove(@Param('id') id: string): Promise<void> {
    return this.todosService.remove(id);
  }
}
