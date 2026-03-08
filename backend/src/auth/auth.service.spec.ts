import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: jest.Mocked<Partial<UsersService>>;
  let jwtService: jest.Mocked<Partial<JwtService>>;

  const mockUser = {
    id: 'uuid-123',
    name: 'Ash Ketchum',
    email: 'ash@pokemon.com',
    password: '$2b$10$hashedpassword',
    createdAt: new Date(),
    updatedAt: new Date(),
    pokemons: [],
  };

  beforeEach(async () => {
    usersService = {
      create: jest.fn(),
      findByEmail: jest.fn(),
    };

    jwtService = {
      sign: jest.fn().mockReturnValue('jwt-token-mock'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('deve registrar um usuário e retornar token jwt', async () => {
      usersService.create!.mockResolvedValue(mockUser as any);

      const result = await service.register({
        name: 'Ash Ketchum',
        email: 'ash@pokemon.com',
        password: 'senha123',
      });

      expect(usersService.create).toHaveBeenCalledWith(
        'Ash Ketchum',
        'ash@pokemon.com',
        'senha123',
      );
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: 'uuid-123',
        email: 'ash@pokemon.com',
      });
      expect(result).toEqual({
        access_token: 'jwt-token-mock',
        user: {
          id: 'uuid-123',
          name: 'Ash Ketchum',
          email: 'ash@pokemon.com',
        },
      });
    });
  });

  describe('login', () => {
    it('deve autenticar e retornar token jwt com credenciais válidas', async () => {
      const hashedPassword = await bcrypt.hash('senha123', 10);
      const userWithHash = { ...mockUser, password: hashedPassword };
      usersService.findByEmail!.mockResolvedValue(userWithHash as any);

      const result = await service.login({
        email: 'ash@pokemon.com',
        password: 'senha123',
      });

      expect(result.access_token).toBe('jwt-token-mock');
      expect(result.user.email).toBe('ash@pokemon.com');
    });

    it('deve lançar UnauthorizedException se usuário não existir', async () => {
      usersService.findByEmail!.mockResolvedValue(null);

      await expect(
        service.login({ email: 'naoexiste@pokemon.com', password: 'senha123' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('deve lançar UnauthorizedException se senha estiver incorreta', async () => {
      usersService.findByEmail!.mockResolvedValue(mockUser as any);

      await expect(
        service.login({ email: 'ash@pokemon.com', password: 'senhaerrada' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
