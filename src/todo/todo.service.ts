import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = this.todoRepository.create(createTodoDto);
    return this.todoRepository.save(todo);
  }

  findMany(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  findOne(id: number): Promise<Todo> {
    return this.todoRepository.findOne({ where: { id } });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    await this.todoRepository.update(id, updateTodoDto);
    return this.todoRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
