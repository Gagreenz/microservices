import { TextblockEntity } from "@app/shared/entities/textblock.entity";
import { BaseAbstractRepository } from "../abstractRepository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TextblockRepository extends BaseAbstractRepository<TextblockEntity> {
    constructor(
        @InjectRepository(TextblockEntity)
        private readonly textblockRepository: Repository<TextblockEntity>,
    ) {
        super(textblockRepository);
    }
}
    