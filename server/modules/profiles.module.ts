import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypesController } from 'server/controllers/types.controller';
import { CitiesController } from 'server/controllers/cities.controller';
import { TrainersController } from 'server/controllers/trainers.controller';
import { City } from 'server/entities/city.entity';
import { PokemonProfile } from 'server/entities/pokemon_profile.entity';
import { Type } from 'server/entities/type.entity';
import { CitiesService } from 'server/providers/services/cities.service';
import { TypesService } from 'server/providers/services/types.service';
import { UsersService } from 'server/providers/services/users.service';
import { UsersModule } from './users.module';
import { Trainer } from 'server/entities/trainer.entity';
import { TrainersService } from 'server/providers/services/trainers.service';

@Module({
  imports: [TypeOrmModule.forFeature([PokemonProfile, Type, City, Trainer]), UsersModule],
  controllers: [TypesController, CitiesController, TrainersController],
  providers: [TypesService, UsersService, CitiesService, TrainersService],
  exports: [TypeOrmModule],
})
export class ProfilesModule {}