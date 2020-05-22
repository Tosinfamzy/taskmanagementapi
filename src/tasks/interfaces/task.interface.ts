import { Document } from 'mongoose';
import { TaskStatus } from './task-status';

export interface Task extends Document {
    readonly title: string;
    readonly description: string;
    status: TaskStatus;
    userId: string;
    createdAt?: Date;
    updatedAt?: Date;
}
