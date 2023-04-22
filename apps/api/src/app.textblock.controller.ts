import { AuthGuard } from '@app/shared/authGuard';
import { 
  Body,
  Controller,
  Get,
  Inject, 
  Post,
  UseGuards,
  Delete,
  Put,
  Query
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
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
    async create(@Body() newTextblock: CreateTextblockDto) {
        return this.textblockService.send(
            { cmd: 'create'},
            newTextblock
        )
    }

    @Put('textblock/update')
    async update(@Body() updateTextblock: UpdateTextblockDto) {
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