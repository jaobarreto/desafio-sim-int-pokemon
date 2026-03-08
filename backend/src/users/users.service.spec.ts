import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let repository: jest.Mocked<Partial<Repository<User>>>;

  const mockUser: User = {
    id: 'uuid-123',
    name: 'Ash Ketchum',
    email: 'ash@pokemon.com',
    password: '$2b$10$hashedpassword',
    createdAt: new Date(),
    updatedAt: new Date(),
    pokemons: [],
  };

  beforeEach(async () => {
    repository = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('deve criar um usuário com senha hasheada', async () => {
      repository.findOne!.mockResolvedValue(null);
      repository.create!.mockReturnValue(mockUser);
      repository.save!.mockResolvedValue(mockUser);

      const result = await service.create(
        'Ash Ketchum',
        'ash@pokemon.com',
        'senha123',
      );

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { email: 'ash@pokemon.com' },
      });
      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Ash Ketchum',
          email: 'ash@pokemon.com',
        }),
      );
      // Verifica que a senha foi hasheada (não é a original)
      const createCall = (repository.create as jest.Mock).mock.calls[0][0];
      expect(createCall.password).not.toBe('senha123');
      expect(result).toEqual(mockUser);
    });

    it('deve lançar ConflictException se email já existir', async () => {
      repository.findOne!.mockResolvedValue(mockUser);

      await expect(
        service.create('Ash', 'ash@pokemon.com', 'senha123'),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('findByEmail', () => {
    it('deve retornar um usuário pelo email', async () => {
      repository.findOne!.mockResolvedValue(mockUser);

      const result = await service.findByEmail('ash@pokemon.com');
      expect(result).toEqual(mockUser);
    });

    it('deve retornar null se usuário não existir', async () => {
      repository.findOne!.mockResolvedValue(null);

      const result = await service.findByEmail('naoexiste@pokemon.com');
      expect(result).toBeNull();
    });
  });

  describe('findById', () => {
    it('deve retornar um usuário pelo id', async () => {
      repository.findOne!.mockResolvedValue(mockUser);

      const result = await service.findById('uuid-123');
      expect(result).toEqual(mockUser);
    });
  });
});
