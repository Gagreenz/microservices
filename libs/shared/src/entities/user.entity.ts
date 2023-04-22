import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm"
import { ProfileEntity } from "./profile.entity";

@Entity({ database: 'users'})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    username: string;
  
    @Column()
    password: string;
  
    @Column()
    role: string;

    // связать таблицы в разных бд не получилось поэтому используем id profile
    // и устанавливаем его в уникальное значение для избежания ситуаций когда 100 пользователей ссылаются на один профиль
    @Column()
    @Index({ unique: true })
    profileId: number;
}