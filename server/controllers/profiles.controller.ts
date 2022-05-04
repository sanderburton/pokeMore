import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { JwtBody } from 'server/decorators/jwt_body.decorator';
import { JwtBodyDto } from 'server/dto/jwt_body.dto';
import { ProfileCreationDto } from 'server/dto/profile_creation.dto';
import { PokemonProfile } from 'server/entities/pokemon_profile.entity';
import { CitiesService } from 'server/providers/services/cities.service';
import { ProfilesSerivce } from 'server/providers/services/profiles.service';
import { TrainersService } from 'server/providers/services/trainers.service';
import { TypesService } from 'server/providers/services/types.service';
import { UsersService } from 'server/providers/services/users.service';

import axios from 'axios';


@Controller()
export class ProfilesController {
  constructor(private profilesService: ProfilesSerivce, private typesSerivice: TypesService,
    private citiesSerivce: CitiesService, private trainersService: TrainersService, private usersService: UsersService) {
    }

    private randomChoice = (array) => {
        if(array.length > 0) {
            return array[Math.floor(Math.random() * array.length)];
        }
        return 'uknown';
    }
    
  @Get('/profiles/:id')
  async find(@Param('id') id: number, @JwtBody() JwtBody: JwtBodyDto) {
    const profile = await this.profilesService.find(id);
    return { profile };
  }

  @Get('/profiles')
  async findAll() {
      // change this to just return the ones that are tied to the user requesting
    const profiles = await this.profilesService.findAll();
    return { profiles };
  }

  @Post('/profiles')
  async createProfile(@Body() body: ProfileCreationDto,  @JwtBody() JwtBody: JwtBodyDto) {
    let profile = new PokemonProfile();

    profile.badges = Math.floor(Math.random() * 9);

    let possibleCities = await this.citiesSerivce.findByCriteria(body);
    console.log(possibleCities);
    profile.city = this.randomChoice(possibleCities);
    
    let possibleTypes = await this.typesSerivice.findByCriteria(body);
    console.log(possibleTypes);
    profile.type = this.randomChoice(possibleTypes);
    
    let possibleTrainers = await this.trainersService.findByCriteria(body);
    console.log(possibleTrainers);
    profile.trainer = this.randomChoice(possibleTrainers);


    profile.user =  await this.usersService.find(JwtBody.userId);

    try {
        let pokeRes = await axios.get(`https://pokeapi.co/api/v2/type/${profile.type.name.toLowerCase()}`) as any;
        console.log('here is the poke res')
        console.log(pokeRes.data.pokemon);
        if(pokeRes?.data?.pokemon) {
            let entry = this.randomChoice(pokeRes.data.pokemon);
            profile.pokemon = entry === 'unknown' ? entry : (entry?.pokemon?.url || 'unknown');
        } else {
            profile.pokemon = 'unknown';
        }
    } catch (err) {
        profile.pokemon = 'unknown';
    }

    await this.profilesService.create(profile);
    return { profile };

  }


}
