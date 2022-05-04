import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Trainer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  slug: string;

  @Column({ nullable: false })
  personality: string;

  @Column({ nullable: false })
  likes: string;

  @Column({ nullable: false })
  morals: string;

  @Column({ nullable: false })
  physical: string;

  @Column({ nullable: true })
  gender: string;
}
