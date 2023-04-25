import { Injectable } from "@nestjs/common";
import { BaseAbstractRepository } from "../abstractRepository";
import { FileEntity } from "@app/shared/entities/file.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class FileRepository extends BaseAbstractRepository<FileEntity> {
    constructor(
        @InjectRepository(FileEntity)
        private readonly fileRepository: Repository<FileEntity>,
    ) {
        super(fileRepository);
    }
}