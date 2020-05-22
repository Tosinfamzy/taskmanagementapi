import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../task.model';

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatus = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,
    ];
    transform(value) {
        value = value.toUpperCase();
        if (!this.checkValidStatus(value)) {
            throw new BadRequestException(`${value} is an invalid status`);
        }
        return value;
    }
    private checkValidStatus(status: any) {
        const index = this.allowedStatus.indexOf(status);
        return index !== -1;
    }
}
