import { TextblockRepository } from '@app/shared/db/repository/textblock.repository';
import { TextblockEntity } from '@app/shared/entities/textblock.entity';
import { Inject, Injectable } from '@nestjs/common';
import { CreateTextblockDto } from './dto/createTextblockDto';
import { UpdateTextblockDto } from './dto/updateTextblockDto';

@Injectable()
export class TextblockService {

  constructor(
    @Inject('TextblockRepository') private readonly textblockRepository: TextblockRepository,
  ) 
  {}

  async findAll(): Promise<TextblockEntity[]> {
    return await this.textblockRepository.findAll();
  }

  async getById(id: number): Promise<TextblockEntity> {
    return await this.textblockRepository.findOneById(id);
  }

  async create(textblockCreate: CreateTextblockDto): Promise<TextblockEntity> {
    const { name, title, text, group} = textblockCreate;
    
    const savedTextblock =  await this.textblockRepository.save({
      name,
      title,
      text,
      group
    });

    return savedTextblock;
  }

  async update(updateTextblock: UpdateTextblockDto): Promise<TextblockEntity> {
    const { id, name, title, text, group } = updateTextblock;
    const textblock = await this.getById(id)

    if(!textblock){
      throw new Error("Textblock does`n exist");
    }

    textblock.name = name;
    textblock.title = title;
    textblock.text = text;
    textblock.group = group;

    return await this.textblockRepository.save(textblock);
  }

  async delete(id: number): Promise<TextblockEntity> {
    const textblock = await this.getById(id);

    if(!textblock){
      throw new Error("Textblock does`n exist");
    }

    return await this.textblockRepository.remove(textblock);
  }
}
