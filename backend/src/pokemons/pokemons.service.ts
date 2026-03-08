import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from './pokemon.entity.js';
import { CreatePokemonDto } from './dto/create-pokemon.dto.js';
import { UpdatePokemonDto } from './dto/update-pokemon.dto.js';

@Injectable()
export class PokemonsService {
  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonsRepository: Repository<Pokemon>,
  ) {}

  async create(
    createPokemonDto: CreatePokemonDto,
    userId: string,
  ): Promise<Pokemon> {
    const pokemon = this.pokemonsRepository.create({
      ...createPokemonDto,
      userId,
    });
    return this.pokemonsRepository.save(pokemon);
  }

  async findAll(): Promise<Pokemon[]> {
    return this.pokemonsRepository.find({
      relations: ['user'],
      order: { pokedexNumber: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Pokemon> {
    const pokemon = await this.pokemonsRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!pokemon) {
      throw new NotFoundException(`Pokemon with ID "${id}" not found`);
    }

    return pokemon;
  }

  async update(
    id: string,
    updatePokemonDto: UpdatePokemonDto,
    userId: string,
  ): Promise<Pokemon> {
    const pokemon = await this.findOne(id);

    if (pokemon.userId !== userId) {
      throw new ForbiddenException(
        'You can only edit Pokémons that you created',
      );
    }

    Object.assign(pokemon, updatePokemonDto);
    return this.pokemonsRepository.save(pokemon);
  }

  async remove(id: string, userId: string): Promise<void> {
    const pokemon = await this.findOne(id);

    if (pokemon.userId !== userId) {
      throw new ForbiddenException(
        'You can only delete Pokémons that you created',
      );
    }

    await this.pokemonsRepository.remove(pokemon);
  }
}
