import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SharedModule, SharedService } from '@app/shared';
import { JwtStrategy } from './jwtStrategy';
import { JwtGuard } from './jwtGuard';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '@app/shared/db/repository/userRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@app/shared/entities/user.entity';
import { ProfileEntity } from '@app/shared/entities/profile.entity';
import { UserDbModule } from '@app/shared/db/userDbModule';


@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '3600s'}
      }),
      inject: [ConfigService],
    }),
    UserDbModule,
    TypeOrmModule.forFeature([
      UserEntity,
      ProfileEntity
    ]),
    SharedModule
  ],
  controllers: [AuthController],
  providers: [
    JwtGuard,
    JwtStrategy,
    AuthService,
    {
      provide: 'SharedService',
      useClass: SharedService,
    },
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'AuthService',
      useClass: AuthService
    }
  ],
})
export class AuthModule {}
