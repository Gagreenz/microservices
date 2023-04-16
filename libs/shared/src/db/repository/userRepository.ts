import { Injectable } from "@nestjs/common";
import { BaseAbstractRepository } from "../abstractRepository";
import { UserEntity } from "@app/shared/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository extends BaseAbstractRepository<UserEntity>{
    constructor(
        @InjectRepository(UserEntity) 
        private readonly userRepository: Repository<UserEntity>,
    ) {
        super(userRepository);
    }
}