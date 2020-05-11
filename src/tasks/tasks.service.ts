import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid';
import { CreateTaskDto } from './dto/ create-task.dto';
@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    public getAllTask(): Task[] {
        return this.tasks;
    }

    public getTaskById(id: string) {
        return this.tasks.find((task) => task.id === id);
    }

    public createTask(createTaskDto: CreateTaskDto) {
        const {title, description} = createTaskDto;
        const task: Task = {
            id: uuid,
            title,
            description,
            status: TaskStatus.OPEN,
        };

        this.tasks.push(task);
        return task;
    }
}
