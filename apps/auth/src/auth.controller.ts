import { Controller, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { SharedService } from '@app/shared';
import { NewUserDto } from './dto/newUserDto';
import { LoginUserDto } from './dto/loginUserDto';
import { UserEntity } from '@app/shared/entities/user.entity';

@Controller()
export class AuthController {
  constructor(
    @Inject('SharedService') private readonly sharedService : SharedService,
    @Inject('AuthService') private readonly authService: AuthService
  ) {}

  @MessagePattern({ cmd: "register"})
  async register(@Ctx() context: RmqContext, @Payload() newUser: NewUserDto): Promise<UserEntity> {
      this.sharedService.acknowledgeMessage(context);
      return await this.authService.register(newUser)
  }

  @MessagePattern({ cmd: "login"})
  async login(@Ctx() context: RmqContext, @Payload() loginUser: LoginUserDto): Promise<{token: string}> {
      this.sharedService.acknowledgeMessage(context);
      return this.authService.login(loginUser)
  }

  @MessagePattern({ cmd: "verify-jwt"})
  async verifyJwt(@Ctx() context: RmqContext, @Payload() payload:{ jwt: string}) {
      this.sharedService.acknowledgeMessage(context);
      return await this.authService.verifyJwt(payload.jwt);
  }
}
