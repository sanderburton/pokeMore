import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  personality: string;

  @Column({ nullable: false })
  likes: string;

  @Column({ nullable: false })
  morals: string;

  @Column({ nullable: false })
  physical: string;
}
