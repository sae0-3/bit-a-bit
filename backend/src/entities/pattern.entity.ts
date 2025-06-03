import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('patterns')
export class Pattern {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 1 })
  complexity: number;

  @Column({ default: true })
  is_active: boolean;
}
