import { ProfileEntity } from "@app/shared/entities/profile.entity";

export class NewUserDto {
    username: string;
    password: string;
    role: string;
    profileId: number;
}