import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SharedModule } from '@app/shared';
import { TextBlockController } from './app.textblock.controller';

@Module({
  imports: [
    SharedModule.registerRmq(
      'AUTH_SERVICE',
      process.env.RABBITMQ_AUTH_QUEUE
    ),
    SharedModule.registerRmq(
      'PROFILE_SERVICE',
      process.env.RABBITMQ_PROFILE_QUEUE
    ),
    SharedModule.registerRmq(
      'TEXTBLOCK_SERVICE',
      process.env.RABBITMQ_TEXTBLOCK_QUEUE
    )
  ],
  controllers: [
    AppController,
    TextBlockController,
  ],
})
export class AppModule {}
