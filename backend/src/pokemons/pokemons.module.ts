import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pokemon } from './pokemon.entity.js';
import { PokemonsService } from './pokemons.service.js';
import { PokemonsController } from './pokemons.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([Pokemon])],
  controllers: [PokemonsController],
  providers: [PokemonsService],
})
export class PokemonsModule {}
