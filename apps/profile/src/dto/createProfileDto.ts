import { UserEntity } from "@app/shared/entities/user.entity";

export class CreateProfileDto {
  name: string;
  phone: string;
  user: UserEntity;
}
