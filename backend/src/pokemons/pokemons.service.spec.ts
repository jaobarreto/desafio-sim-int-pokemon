import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PokemonsService } from './pokemons.service';
import { Pokemon } from './pokemon.entity';

describe('PokemonsService', () => {
  let service: PokemonsService;
  let repository: jest.Mocked<Partial<Repository<Pokemon>>>;

  const mockPokemon: Pokemon = {
    id: 'pokemon-uuid-1',
    name: 'Pikachu',
    type: 'Electric',
    level: 25,
    hp: 35,
    pokedexNumber: 25,
    userId: 'user-uuid-1',
    user: {} as any,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    repository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonsService,
        {
          provide: getRepositoryToken(Pokemon),
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<PokemonsService>(PokemonsService);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('deve criar um pokémon vinculado ao usuário', async () => {
      const dto = {
        name: 'Pikachu',
        type: 'Electric',
        level: 25,
        hp: 35,
        pokedexNumber: 25,
      };
      repository.create!.mockReturnValue(mockPokemon);
      repository.save!.mockResolvedValue(mockPokemon);

      const result = await service.create(dto, 'user-uuid-1');

      expect(repository.create).toHaveBeenCalledWith({
        ...dto,
        userId: 'user-uuid-1',
      });
      expect(result).toEqual(mockPokemon);
    });
  });

  describe('findAll', () => {
    it('deve retornar todos os pokémons ordenados por número da pokédex', async () => {
      repository.find!.mockResolvedValue([mockPokemon]);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalledWith({
        relations: ['user'],
        order: { pokedexNumber: 'ASC' },
      });
      expect(result).toEqual([mockPokemon]);
    });
  });

  describe('findOne', () => {
    it('deve retornar um pokémon pelo id', async () => {
      repository.findOne!.mockResolvedValue(mockPokemon);

      const result = await service.findOne('pokemon-uuid-1');
      expect(result).toEqual(mockPokemon);
    });

    it('deve lançar NotFoundException se pokémon não existir', async () => {
      repository.findOne!.mockResolvedValue(null);

      await expect(service.findOne('id-inexistente')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('deve atualizar pokémon se o usuário for o dono', async () => {
      const updatedPokemon = { ...mockPokemon, name: 'Raichu' };
      repository.findOne!.mockResolvedValue(mockPokemon);
      repository.save!.mockResolvedValue(updatedPokemon);

      const result = await service.update(
        'pokemon-uuid-1',
        { name: 'Raichu' },
        'user-uuid-1',
      );

      expect(result.name).toBe('Raichu');
    });

    it('deve lançar ForbiddenException se o usuário NÃO for o dono', async () => {
      repository.findOne!.mockResolvedValue(mockPokemon);

      await expect(
        service.update('pokemon-uuid-1', { name: 'Raichu' }, 'outro-user-uuid'),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('remove', () => {
    it('deve remover pokémon se o usuário for o dono', async () => {
      repository.findOne!.mockResolvedValue(mockPokemon);
      repository.remove!.mockResolvedValue(mockPokemon);

      await service.remove('pokemon-uuid-1', 'user-uuid-1');

      expect(repository.remove).toHaveBeenCalledWith(mockPokemon);
    });

    it('deve lançar ForbiddenException se o usuário NÃO for o dono', async () => {
      repository.findOne!.mockResolvedValue(mockPokemon);

      await expect(
        service.remove('pokemon-uuid-1', 'outro-user-uuid'),
      ).rejects.toThrow(ForbiddenException);
    });
  });
});
