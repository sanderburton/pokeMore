import { Controller, Get, Param } from '@nestjs/common';
import { JwtBody } from 'server/decorators/jwt_body.decorator';
import { JwtBodyDto } from 'server/dto/jwt_body.dto';
import { CitiesService } from 'server/providers/services/cities.service';

@Controller()
export class CitiesController {
  constructor(
    private citiesService: CitiesService,
  ) {}

  @Get('/cities/:id')
  async find(@Param('id') id: number, @JwtBody() JwtBody: JwtBodyDto) {
    const city = await this.citiesService.find(id);
    return { city };
  }

  @Get('/cities')
  async findAll() {
    const cities = await this.citiesService.findAll();
    return {cities};
  }
}