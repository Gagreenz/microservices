import { ProfileRepository } from '@app/shared/db/repository/profileRepository';
import { Inject, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/createProfileDto';
import { ProfileEntity } from '@app/shared/entities/profile.entity';
import { UpdateProfileDto } from './dto/updateProfileDto';

@Injectable()
export class ProfileService {
  constructor(
    @Inject('ProfileRepository') 
    private readonly profileRepository: ProfileRepository,
  ) {}

  async create(profileCreate: CreateProfileDto): Promise<ProfileEntity> {
    const { name, phone, user } = profileCreate;
    const savedProfile =  await this.profileRepository.save({
      name,
      phone,
      user
    });



    return savedProfile;
  }

  async getAll(): Promise<ProfileEntity[]>{
    return await this.profileRepository.findAll();
  }

  async getById(id: number): Promise<ProfileEntity> {
    return await this.profileRepository.findOneById(id);
  }

  async delete(id: number): Promise<ProfileEntity> {
    const profile = await this.getById(id);

    return await this.profileRepository.remove(profile);
  }

  async update(updateProfile: UpdateProfileDto): Promise<ProfileEntity> {
    const { id, name, phone} = updateProfile;
    const profile = await this.getById(id);

    profile.name = name;
    profile.phone = phone;

    return await this.profileRepository.save(profile);
  }
}
