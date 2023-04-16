import { AuthGuard } from '@app/shared/authGuard';
import { UserEntity } from '@app/shared/entities/user.entity';
import { 
  Body,
  Controller,
  Get,
  Inject, 
  Post,
  UseGuards,
  Delete,
  Put,
  Headers,
  Query
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProfileDto } from 'apps/profile/src/dto/createProfileDto';
import { UpdateProfileDto } from 'apps/profile/src/dto/updateProfileDto';
import { map } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    @Inject('PROFILE_SERVICE') private readonly profileService: ClientProxy,
  ) {}

  @Post('auth/register')
  async register(
    @Body('username') username: string,
    @Body('role') role: string,
    @Body('password') password: string,
    @Body('phone') phone: string,
    @Body('name') name: string
  ) {
    const user = await this.authService.send(
      { cmd: 'register'},
      {
        username,
        password,
        role,
      },
    ).toPromise();

    return this.profileService.send({cmd: 'create'},{ name, phone, user })
  }

  @Post('auth/login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.authService.send(
      {
        cmd: 'login',
      },
      {
        username,
        password,
      },
    );
  }

  @UseGuards(AuthGuard)
  @Get()
  async test(){
    return "top secret"
  }

  @Get('profile/getAll')
  getByAll(){
      return this.profileService.send({cmd: 'get-all' },{});
  }

  @Get('profile/getById')
  getById(@Headers() header){
      const id = header.id;
      return this.profileService.send({ cmd: 'get-by-id' },{ id });
  }

  @Delete('profile/delete')
  @UseGuards(AuthGuard)
  async delete(@Query('id') id: number) {
      return await this.profileService.send({ cmd: 'delete'},{ id });
  }

  
  @Put('profile/update')
  @UseGuards(AuthGuard)
  update(@Body() updateProfileDto : UpdateProfileDto){
      this.profileService.send({ cmd: 'update'},{ updateProfileDto});
  }

}
