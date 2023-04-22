import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { ProfileDbModule } from '@app/shared/db/profileDbModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from '@app/shared/entities/profile.entity';
import { SharedModule, SharedService } from '@app/shared';
import { ProfileRepository } from '@app/shared/db/repository/profile.repository';
import { UserEntity } from '@app/shared/entities/user.entity';

@Module({
  imports: [
    ProfileDbModule,
    TypeOrmModule.forFeature([
      ProfileEntity
    ]),
    SharedModule,
  ],
  controllers: [ProfileController],
  providers: [
    {
      provide: 'SharedService',
      useClass: SharedService,
    },
    {
      provide: 'ProfileRepository',
      useClass: ProfileRepository,
    },
    {
      provide: 'ProfileService',
      useClass: ProfileService,
    }

  ],
})
export class ProfileModule {}
