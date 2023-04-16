import { Controller, Inject } from '@nestjs/common';
import { Ctx, MessagePattern, Payload } from '@nestjs/microservices';
import { SharedService } from '@app/shared';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/createProfileDto';
import { ProfileEntity } from '@app/shared/entities/profile.entity';
import { UpdateProfileDto } from './dto/updateProfileDto';

@Controller()
export class ProfileController {
  constructor(
    @Inject('SharedService') private readonly sharedService: SharedService,
    @Inject('ProfileService') private readonly profileService: ProfileService,
  ) {}

  @MessagePattern({ cmd: "create"})
  async create(@Ctx() context, @Payload() createProfileDto: CreateProfileDto): Promise<ProfileEntity> {
    this.sharedService.acknowledgeMessage(context);

    return await this.profileService.create(createProfileDto);
  }

  @MessagePattern({ cmd: "get-all"})
  async getAll(@Ctx() context): Promise<ProfileEntity[]> {
    this.sharedService.acknowledgeMessage(context);

    return await this.profileService.getAll();
  }

  @MessagePattern({ cmd: 'get-by-id'})
  async getById(@Ctx() context,@Payload() id: number): Promise<ProfileEntity>{
    this.sharedService.acknowledgeMessage(context);

    return await this.profileService.getById(id);
  }

  @MessagePattern({ cmd: 'delete'})
  async delete(@Ctx() context,@Payload() id: number): Promise<ProfileEntity>{
    this.sharedService.acknowledgeMessage(context);

    return await this.profileService.delete(id);
  }

  @MessagePattern({ cmd: 'update'})
  async update(@Ctx() context,@Payload() updateProfile: UpdateProfileDto): Promise<ProfileEntity>{
    this.sharedService.acknowledgeMessage(context);

    return this.profileService.update(updateProfile);
  }
}
