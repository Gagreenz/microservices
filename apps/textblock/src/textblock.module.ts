import { Module } from '@nestjs/common';
import { TextblockController } from './textblock.controller';
import { TextblockService } from './textblock.service';
import { SharedModule, SharedService } from '@app/shared';
import { TextblockRepository } from '@app/shared/db/repository/textblock.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TextblockEntity } from '@app/shared/entities/textblock.entity';
import { UserDbModule } from '@app/shared/db/userDbModule';

@Module({
  imports: [
    SharedModule,
    UserDbModule,
    TypeOrmModule.forFeature([
      TextblockEntity,
    ])
  ],
  controllers: [TextblockController],
  providers: [
    {
      provide: 'TextblockService',
      useClass: TextblockService,
    },
    {
      provide: 'SharedService',
      useClass: SharedService,
    },
    {
      provide: 'TextblockRepository',
      useClass: TextblockRepository,
    }
  ],
})
export class TextblockModule {}
