import { BadRequestException, ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '@app/shared/db/repository/user.repository';
import { UserEntity } from '@app/shared/entities/user.entity';

import { LoginUserDto } from './dto/loginUserDto';
import { NewUserDto } from './dto/newUserDto';
import { UserJwt } from '@app/shared/userJwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserRepository')
    private readonly usersRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}


  async register(newUser: NewUserDto): Promise<UserEntity> {
    const { username, password, role, profileId } = newUser;
    const existingUser = await this.usersRepository.findByCondition({where:{ username}});

    if(existingUser){
      throw new ConflictException('An account with that username already exists!');
    }
    
    const savedUser = await this.usersRepository.save({
      username,
      password,
      role,
      profileId
    });

    return savedUser;
  }

  async login(loginUser: LoginUserDto): Promise<{ token: string}> {
    const { username, password} = loginUser;

    const user = await this.validateUser(username,password);

    delete user.password;

    const jwt = await this.jwtService.signAsync({user});

    return { token: jwt};
  }

  async validateUser(username: string, password: string): Promise<UserEntity> {
    const user = await this.usersRepository.findByCondition({where:{ username}});

    const isUserExist = !!user;

    if(!isUserExist) return null;

    if(password != user.password) return null;

    return user;
  }

  async verifyJwt(jwt: string) {
    if(!jwt) {
      throw new UnauthorizedException();
    }

    try {
      return this.jwtService.decode(jwt) as UserJwt;
    } catch(error) {
      throw new BadRequestException();
    }
  }

}
