import { Injectable, NotFoundException, BadRequestException, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { SignUpCredentialsDto } from './dto/sign-up-credentials.dto';
import { genSalt, hash } from 'bcrypt';
import { AuthCredentailsDto } from './dto/auth-credentials.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload-interface';

@Injectable()
export class AuthService {
    constructor(@InjectModel('User') private userModel: Model<User>, private jwtService: JwtService) { }

    async signUp(signUpCredentials: SignUpCredentialsDto): Promise<User> {
        try {
            const user = await this.userModel.create({ ...signUpCredentials });
            const salt = await genSalt(10);
            user.password = await hash(user.password, salt);
            await user.save();
            user.password = null;
            return user;
        } catch (error) {
            if ((error.errors.username && error.errors.username.kind === 'unique') ||
                (error.errors.email && error.errors.email.kind === 'unique')) {
                throw new HttpException(error.message, 400);
            }

        }
    }

    async signIn(authCredentials: AuthCredentailsDto): Promise<{ accessToken: string }> {
        const { email, password } = authCredentials;

        const user = await this.userModel.findOne({ email });
        if (!user) { throw new NotFoundException(`User Not Found`); }

        const isValid = await compare(password, user.password);
        if (!isValid) { throw new BadRequestException(`Invalid data`); }

        const payload: JwtPayload = { username: user.username, email: user.email };
        const accessToken = await this.jwtService.sign(payload);
        return { accessToken };
    }

    async findUserByEmail(email: string) {
        return await this.userModel.findOne({ email });
    }
}
