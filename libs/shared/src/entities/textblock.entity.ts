import { Entity, Column, PrimaryGeneratedColumn,ManyToOne,JoinColumn } from 'typeorm';
import { FileEntity } from './file.entity';

@Entity()
export class TextblockEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  title: string;

  @ManyToOne(() => FileEntity, { nullable: true })
  @JoinColumn()
  file: FileEntity;

  @Column()
  text: string;

  @Column()
  group: string;
}