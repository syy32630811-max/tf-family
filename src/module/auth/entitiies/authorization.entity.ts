import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('authorization')
export class AuthorizationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text'})
  token: string;

  @Column()
  active: number;

  @CreateDateColumn()
  create_time: Date;
}