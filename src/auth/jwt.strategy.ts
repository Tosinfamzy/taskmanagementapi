import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload-interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'ThisIsTheSecretSeedOfTheToken',
        });
    }

    async validate(payload: JwtPayload) {
        const { email } = payload;
        const user = await this.authService.findUserByEmail(email);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
