import { Controller, Body, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpCredentialsDto } from './dto/sign-up-credentials.dto';
import { AuthCredentailsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/sign-up')
    @UsePipes(ValidationPipe)
    async signUp(@Body() signupCredentials: SignUpCredentialsDto) {
        return await this.authService.signUp(signupCredentials);
    }

    @Post('/sign-in')
    @UsePipes(ValidationPipe)
    async signIn(@Body() authCredentials: AuthCredentailsDto) {
        return await this.authService.signIn(authCredentials);
    }
}
