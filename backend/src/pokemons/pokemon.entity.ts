import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity.js';

@Entity('pokemons')
export class Pokemon {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 50 })
  type!: string;

  @Column()
  level!: number;

  @Column()
  hp!: number;

  @Column()
  pokedexNumber!: number;

  @Column()
  userId!: string;

  @ManyToOne(() => User, (user) => user.pokemons, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
