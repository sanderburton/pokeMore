import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
  } from 'typeorm';
  import { Type } from './type.entity';
  import { City } from './city.entity';
  import { User } from './user.entity';
  
  @Entity()
  export class PokemonProfile {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Type, {nullable: false})
    type: Type;
  
    @ManyToOne(() => City, {nullable: false})
    city: City;

    @Column({nullable: false})
    pokemon: string;

    @Column({nullable: false})
    badges: number;

    @ManyToOne(() => User, {nullable: false})
    user: User;
  }