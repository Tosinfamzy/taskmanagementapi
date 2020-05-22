import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    @Get()
    async getUsers(): Promise<User[]> {
        return await this.userService.getUsers();
    };
}