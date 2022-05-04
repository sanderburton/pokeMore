import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class PokemonProfile1651363914586 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'type',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'name',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'personality',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'likes',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'morals',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'physical',
            type: 'text',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'city',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'name',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'personality',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'likes',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'morals',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'physical',
            type: 'text',
            isNullable: false,
          },
        ],
      }),
    );


    await queryRunner.createTable(
      new Table({
        name: 'trainer',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'slug',
            type: 'text',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'name',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'personality',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'likes',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'morals',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'physical',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'gender', 
            type: 'text',
            isNullable: true
          }
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'pokemon_profile',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'typeId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'cityId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'trainerId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'userId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'badges',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'pokemon',
            type: 'text',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('type');
    await queryRunner.dropTable('city');
    await queryRunner.dropTable('pokemon_profile');
  }
}
