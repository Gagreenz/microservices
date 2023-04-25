import { AuthGuard } from '@app/shared/authentication/authGuard';
import { 
  Body,
  Controller,
  Get,
  Inject, 
  Post,
  UseGuards,
  Delete,
  Put,
  Query
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { UpdateProfileDto } from 'apps/profile/src/dto/updateProfileDto';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    @Inject('PROFILE_SERVICE') private readonly profileService: ClientProxy,
  ) {}


  //просто предположим что это происходит когда пользователь в процеесе регистрации зафигачил кучу данных и фронт нормально передал все в одном запросе
  @Post('auth/register')
  async register(
    @Body('username') username: string,
    @Body('roles') roles: string,
    @Body('password') password: string,
    @Body('phone') phone: string,
    @Body('name') name: string
  ) {

    const profile = await this.profileService.send(
      {cmd: 'create'},
      { name, phone }
    ).toPromise();

    return this.authService.send(
      { cmd: 'register'},
      {
        username,
        password,
        roles,
        profileId: profile.id,
      },
    )

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
  getAll(){
      return this.profileService.send({cmd: 'get-all' },{});
  }

  @Get('profile/getById')
  getById(@Query('id') id: number){
      return this.profileService.send({ cmd: 'get-by-id' }, id );
  }

  @Delete('profile/delete')
  @UseGuards(AuthGuard)
  async delete(@Query('id') id: number) {
      return await this.profileService.send({ cmd: 'delete'}, id );
  }

  
  @Put('profile/update')
  @UseGuards(AuthGuard)
  update(@Body() updateProfileDto : UpdateProfileDto){
      return this.profileService.send({ cmd: 'update'}, updateProfileDto);
  }

  

}
