import { FileEntity } from "@app/shared/entities/file.entity";

export class CreateTextblockDto {
    name: string;
    title: string;
    text: string;
    group: string;
    file: FileEntity;
}