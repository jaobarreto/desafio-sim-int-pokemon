import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  ParseUUIDPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { PokemonsService } from './pokemons.service.js';
import { CreatePokemonDto } from './dto/create-pokemon.dto.js';
import { UpdatePokemonDto } from './dto/update-pokemon.dto.js';

@Controller('pokemons')
@UseGuards(JwtAuthGuard)
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Post()
  create(@Body() createPokemonDto: CreatePokemonDto, @Request() req: any) {
    return this.pokemonsService.create(createPokemonDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.pokemonsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.pokemonsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePokemonDto: UpdatePokemonDto,
    @Request() req: any,
  ) {
    return this.pokemonsService.update(id, updatePokemonDto, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string, @Request() req: any) {
    return this.pokemonsService.remove(id, req.user.id);
  }
}
