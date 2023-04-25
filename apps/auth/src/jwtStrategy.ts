import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtRequest } from './jwtRequest';
import { UserRepository } from '@app/shared/db/repository/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: UserRepository,
    ){
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: JwtRequest) => {
                    return request?.jwt;
                }
            ]),
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: any) {
        const id = payload.user.id;
        const user = await this.userRepository.findOneById(id);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}