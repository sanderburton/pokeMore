import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trainer } from 'server/entities/trainer.entity';

@Injectable()
export class TrainersService {
  constructor(
    @InjectRepository(Trainer)
    private trainersRepository: Repository<Trainer>,
  ) {}

  find(id: number, relations: string[] = []) {
    return this.trainersRepository.findOne(id, { relations });
  }

  findAll() {
    return this.trainersRepository.find();
  }

  create(city: Trainer) {
    return this.trainersRepository.save(city);
  }
}
