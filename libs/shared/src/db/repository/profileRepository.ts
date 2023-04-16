import { Injectable } from "@nestjs/common";
import { BaseAbstractRepository } from "../abstractRepository";
import { ProfileEntity } from "@app/shared/entities/profile.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ProfileRepository extends BaseAbstractRepository<ProfileEntity>{
    constructor(
        @InjectRepository(ProfileEntity) 
        private readonly UserRepository: Repository<ProfileEntity>,
    ) {
        super(UserRepository);
    }
}