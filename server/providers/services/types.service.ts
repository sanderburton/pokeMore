import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Type } from 'server/entities/type.entity';

@Injectable()
export class TypesService {
  constructor(
    @InjectRepository(Type)
    private typesRepository: Repository<Type>,
  ) {}

  findAll() {
    return this.typesRepository.find();
  }

  find(id: number, relations: string[] = []) {
    return this.typesRepository.findOne(id, { relations });
  }

  findByCriteria(criteria): Promise<Type[]> {
    return this.typesRepository.find({
      where: criteria
    })
  }

  create(type: Type) {
    return this.typesRepository.save(type);
  }
}
