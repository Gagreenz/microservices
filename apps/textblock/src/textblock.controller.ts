import { Controller, Get, Inject } from '@nestjs/common';
import { TextblockService } from './textblock.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { SharedService } from '@app/shared';
import { TextblockEntity } from '@app/shared/entities/textblock.entity';
import { CreateTextblockDto } from './dto/createTextblockDto';
import { UpdateTextblockDto } from './dto/updateTextblockDto';

@Controller()
export class TextblockController {
  constructor(
    @Inject('SharedService') private readonly sharedService: SharedService,
    @Inject('TextblockService') private readonly textblockService: TextblockService,
  ) {}

  @MessagePattern({ cmd: 'find-all'})
  async findAll(
    @Ctx() context: RmqContext
  ) : Promise<TextblockEntity[]> {
    this.sharedService.acknowledgeMessage(context);

    return this.textblockService.findAll();
  }

  @MessagePattern({ cmd: 'get-by-id'})
  async getById(
    @Ctx() context: RmqContext,
    @Payload() id: number
  ) : Promise<TextblockEntity> {
    this.sharedService.acknowledgeMessage(context);

    return this.textblockService.getById(id);
  }

  @MessagePattern({ cmd: 'create'})
  async create(
    @Ctx() context: RmqContext,
    @Payload() newTextBlock: CreateTextblockDto
  ) : Promise<TextblockEntity> {
    this.sharedService.acknowledgeMessage(context);

    return this.textblockService.create(newTextBlock);
  }

  @MessagePattern({ cmd: 'update'})
  async update(
    @Ctx() context: RmqContext,
    @Payload() updateTextBlock: UpdateTextblockDto
  ) : Promise<TextblockEntity> {
    this.sharedService.acknowledgeMessage(context);

    return this.textblockService.update(updateTextBlock);
  }

  @MessagePattern({ cmd: 'delete'})
  async delete(
    @Ctx() context: RmqContext,
    @Payload() id: number,
  ) : Promise<TextblockEntity> {
    this.sharedService.acknowledgeMessage(context);
    
    return this.textblockService.delete(id);
  }
}
