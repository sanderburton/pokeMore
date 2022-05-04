import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PokemonProfile } from 'server/entities/pokemon_profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfilesSerivce {
  constructor(
    @InjectRepository(PokemonProfile)
    private pokemonProfileRepository: Repository<PokemonProfile>,
  ) {}

  find(id: number, relations: string[] = []) {
    return this.pokemonProfileRepository.findOne(id, { relations });
  }

  findAll() {
      // change this to just get the ones tied to the user!
    return this.pokemonProfileRepository.find();
  }

  create(profile: PokemonProfile) {
    return this.pokemonProfileRepository.save(profile);
  }
}
