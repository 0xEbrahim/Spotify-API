import { Exclude } from 'class-transformer';
import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class AbstractedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  @Exclude()
  public createdAt: Date;
}
