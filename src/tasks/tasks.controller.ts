import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/ create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor( private _taskService: TasksService) {}
    @Get()
    public getAllTasks(): Task[] {
        return this._taskService.getAllTask();
    }

    @Get('/:id')
    public getTaskById(@Param('id') id: string) {
        return this._taskService.getTaskById(id);
    }

    @Post()
    public createTask(
    @Body() createTaskDto: CreateTaskDto,
    ) {
        return this._taskService.createTask(createTaskDto);
    }
}
