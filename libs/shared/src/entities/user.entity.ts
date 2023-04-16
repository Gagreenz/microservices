import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn} from "typeorm"
import { ProfileEntity } from "./profile.entity";


@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    username: string;
  
    @Column()
    password: string;
  
    @Column()
    role: string;

    @OneToOne(() => 
    ProfileEntity, profile => 
            profile.user,
            { 
                cascade: true,
                 onDelete: 'CASCADE' 
            }
    )
    @JoinColumn()
    profile: ProfileEntity;

}