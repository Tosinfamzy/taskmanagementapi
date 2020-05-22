import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './interfaces/task.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './interfaces/task-status';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { User } from 'src/auth/interfaces/user.interface';

@Injectable()
export class TaskService {
    constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) { }

    async getTasks(getTaskFilterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
        return await this.getTasksByQueryProperties(getTaskFilterDto, user);
    }

    async getTaskByIdAndUserId(id: string, user: User): Promise<Task> {
        const task = await this.taskModel.findOne({ _id: id, user: user._id }).populate('user', 'username email');
        if (!task) { throw new NotFoundException(`Task Not Found`); }
        return task;
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const task = await this.taskModel.create({ ...createTaskDto, status: TaskStatus.OPEN, user: user._id });
        task.save();
        return task;
    }

    async updateStatus(id: string, status: TaskStatus, user: User): Promise<Task> {
        const task = await this.getTaskByIdAndUserId(id, user);
        task.status = status;
        return await this.taskModel.findByIdAndUpdate(id, task, { new: true });
    }

    async deleteTask(id: string, user: User): Promise<boolean> {
        await this.getTaskByIdAndUserId(id, user);
        await this.taskModel.findByIdAndDelete(id);
        return true;
    }

    async getTasksByQueryProperties(getTaskFilterDto: GetTaskFilterDto, user: User) {
        if (Object.keys(getTaskFilterDto).length > 0) {
            const { search, status } = getTaskFilterDto;
            const regex = new RegExp(search, 'i');
            if (status && search) {
                return await this.taskModel.find({ status, user: user._id })
                    .or([{ title: regex }, { description: regex }])
                    .populate('user', 'username email');
            }
            if (status) {
                return await this.taskModel.find({ status, user: user._id }).populate('user', 'username email');
            }
            if (search) {
                return await this.taskModel.find({ user: user._id })
                    .or([{ title: regex }, { description: regex }])
                    .populate('user', 'username email');
            }
        }
        return await this.taskModel.find({ user: user._id }).populate('user', 'username email');;
    }

}
