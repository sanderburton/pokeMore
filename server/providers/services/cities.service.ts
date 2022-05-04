import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from 'server/entities/city.entity';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private citiesRespository: Repository<City>,
  ) {}

  find(id: number, relations: string[] = []) {
    return this.citiesRespository.findOne(id, { relations });
  }

  findAll() {
    return this.citiesRespository.find();
  }

  findByCriteria(criteria): Promise<City[]> {
    return this.citiesRespository.find({
      where: criteria
    })
  }

  create(city: City) {
    return this.citiesRespository.save(city);
  }
}
