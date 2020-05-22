import { AuthCredentailsDto } from './auth-credentials.dto';
import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class SignUpCredentialsDto extends AuthCredentailsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @IsNotEmpty()
    username: string;
}
