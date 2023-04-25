import { AuthGuard } from '@app/shared/authentication/authGuard';
import { Role } from '@app/shared/authentication/role';
import { Roles } from '@app/shared/authentication/rolesDecorator';
import { RolesGuard } from '@app/shared/authentication/rolesGuard';
import { FileEntity } from '@app/shared/entities/file.entity';
import { 
  Body,
  Controller,
  Get,
  Inject, 
  Post,
  UseGuards,
  Delete,
  Put,
  Query,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateTextblockDto } from 'apps/textblock/src/dto/createTextblockDto';
import { UpdateTextblockDto } from 'apps/textblock/src/dto/updateTextblockDto';

@Controller()
export class TextBlockController {
    constructor(
        @Inject('TEXTBLOCK_SERVICE') private readonly textblockService: ClientProxy,
    ) {}
     
    @Get('textblock/getAll')
    async getAll() {
        return this.textblockService.send(
            { cmd: 'find-all'},
            {}
        )
    }

    @Get('textblock/getById')
    async getById(@Query('id') id: number) {
        return this.textblockService.send(
            { cmd: 'get-by-id'},
            id
        )
    }

    @Post('textblock/create')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard,RolesGuard)
    @UseInterceptors(FileInterceptor('file'))
    async create(@Body() newTextblock: CreateTextblockDto, @UploadedFile() file: FileEntity) {
        const newFile = new FileEntity();
        newFile.originalname = file.originalname;
        newFile.mimetype = file.mimetype;
        newFile.size = file.size;
        newFile.buffer = file.buffer;

        newTextblock.file = newFile;
        return this.textblockService.send(
            { cmd: 'create'},
            newTextblock
        )
    }

    @Put('textblock/update')
    @UseInterceptors(FileInterceptor('file'))
    async update(@Body() updateTextblock: UpdateTextblockDto, @UploadedFile() file: FileEntity) {
        const newFile = new FileEntity();
        newFile.originalname = file.originalname;
        newFile.mimetype = file.mimetype;
        newFile.size = file.size;
        newFile.buffer = file.buffer;

        updateTextblock.file = newFile;
        return this.textblockService.send(
            { cmd: 'update'},
            updateTextblock
        )
    }

    @Delete('textblock/delete')
    async delete(@Query('id') id) {
        return this.textblockService.send(
            { cmd: 'delete'},
            id
        )
    }
}