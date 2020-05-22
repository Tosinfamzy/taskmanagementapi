import { IsString, MinLength, MaxLength, IsNotEmpty, IsEmail, Matches } from 'class-validator';

export class AuthCredentailsDto {

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'Password should have at least one Uppercase vowel, one lowercase vowel, one number, and one special character' })
    @IsNotEmpty()
    password: string;
}
