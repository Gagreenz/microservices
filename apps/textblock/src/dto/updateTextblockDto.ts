import { FileEntity } from "@app/shared/entities/file.entity";

export class UpdateTextblockDto {
    id: number;
    name: string;
    title: string;
    text: string;
    group: string;
    file: FileEntity;
}