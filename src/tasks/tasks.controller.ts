import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/ create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private _taskService: TasksService) { }
    @Get()
    public getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
        if (Object.keys(filterDto).length) {
            return this._taskService.getTasksWithFilters(filterDto);
        } else {
            return this._taskService.getAllTasks();
        }
    }

    @Get('/:id')
    public getTaskById(@Param('id') id: string) {
        return this._taskService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    public createTask(
        @Body() createTaskDto: CreateTaskDto,
    ) {
        return this._taskService.createTask(createTaskDto);
    }

    @Patch('/:id')
    public updateTaskStatus(
        @Param('id') id: string,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    ) {
        return this._taskService.updateTaskStatus(id, status);
    }

    @Delete('/:id')
    public deleteTask(
        @Param('id') id: string,
    ) {
        this._taskService.deleteTask(id);
    }
}
