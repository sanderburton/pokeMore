import { MigrationInterface, QueryRunner } from 'typeorm';
import { City } from '../../entities/city.entity';
import { Type } from '../../entities/type.entity';

const csv = require('csv-parser');
const fs = require('fs');

export class PopulateCityAndType1651368711561 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {

    const cityRepo = queryRunner.connection.getRepository(City);
    const typeRepo = queryRunner.connection.getRepository(Type);

    let cities = [];
    fs.createReadStream('./cities.csv')
      .pipe(csv())
      .on('data', (data) => cities.push(data));

    let types = [];
    fs.createReadStream('./types.csv')
      .pipe(csv())
      .on('data', (data) => types.push(data));
      
    await cityRepo.insert(cities);
    await typeRepo.insert(types);

  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
