import { Controller, Get, Param } from '@nestjs/common';
import { JwtBody } from 'server/decorators/jwt_body.decorator';
import { JwtBodyDto } from 'server/dto/jwt_body.dto';
import { TypesService } from 'server/providers/services/types.service';

@Controller()
export class TypesController {
  constructor(
    private typesService: TypesService,
  ) {}

  @Get('/types/:id')
  async find(@Param('id') id: number, @JwtBody() JwtBody: JwtBodyDto) {
    const type = await this.typesService.find(id);
    return { type };
  }

  @Get('/types')
  async findAll() {
    const types = await this.typesService.findAll();
    return {types};
  }
}