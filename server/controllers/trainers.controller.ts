import { Controller, Get, Param } from '@nestjs/common';
import { JwtBody } from 'server/decorators/jwt_body.decorator';
import { JwtBodyDto } from 'server/dto/jwt_body.dto';
import { TrainersService } from 'server/providers/services/trainers.service';

@Controller()
export class TrainersController {
  constructor(private trainersService: TrainersService) {}

  @Get('/trainers/:id')
  async find(@Param('id') id: number, @JwtBody() JwtBody: JwtBodyDto) {
    const trainer = await this.trainersService.find(id);
    return { trainer };
  }

  @Get('/trainers')
  async findAll() {
    const trainers = await this.trainersService.findAll();
    return { trainers };
  }
}
