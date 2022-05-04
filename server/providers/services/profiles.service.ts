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

  find(id: number, relations: string[] = ['type', 'city', 'trainer', 'user']) {
    return this.pokemonProfileRepository.findOne(id, { relations });
  }

  findAll(user = null, relations: string[] = ['type', 'city', 'trainer', 'user']) {
    if(user) {
      return this.pokemonProfileRepository.find({
        where: {
          user: user
        },
        relations: relations
      })
    } else {
      return this.pokemonProfileRepository.find({relations});
    }
  }

  create(profile: PokemonProfile) {
    return this.pokemonProfileRepository.save(profile);
  }
}
