import { Controller, Post, Body, UsePipes, ValidationPipe, Res, HttpStatus, Get, Query, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { TaskService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Response } from 'express';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { Task } from './interfaces/task.interface';
import { TaskStatus } from './interfaces/task-status';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-users.decorators';
import { User } from 'src/auth/interfaces/user.interface';

@Controller('task')
@UseGuards(AuthGuard('jwt'))
export class TaskController {
    constructor(private taskService: TaskService) { }

    @Get()
    async getTasks(
        @GetUser() user: User,
        @Query(ValidationPipe) getTaskFilterDto: GetTaskFilterDto,
    ): Promise<Task[]> {
        return await this.taskService.getTasks(getTaskFilterDto, user);
    }

    @Get('/:id')
    async getTaskById(
        @GetUser() user: User,
        @Param('id') id: string,
    ): Promise<Task> {
        return await this.taskService.getTaskByIdAndUserId(id, user);
    }

    @Post('/create')
    @UsePipes(ValidationPipe)
    async createTask(
        @GetUser() user: User,
        @Body() createTaskDto: CreateTaskDto,
        @Res() res: Response,
    ): Promise<Response> {
        const task = await this.taskService.createTask(createTaskDto, user);
        return res.status(HttpStatus.CREATED).json(task);
    }

    @Patch('/:id/status')
    async updateTaskStatus(
        @GetUser() user: User,
        @Param('id') id: string,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    ): Promise<Task> {
        return await this.taskService.updateStatus(id, status, user);
    }

    @Delete('/:id')
    async deleteTask(
        @GetUser() user: User,
        @Param('id') id: string,
        @Res() res: Response,
    ): Promise<Response> {
        const taskDeleted = await this.taskService.deleteTask(id, user);
        if (taskDeleted) { return res.status(HttpStatus.OK).json({ message: 'Task succesfully deleted' }); }
    }

}
