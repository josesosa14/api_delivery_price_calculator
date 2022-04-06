import { ApiProperty } from '@nestjs/swagger';
import { Calculator } from './calculator.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class DistancePrice extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty()
  @Column({ unique: true, type: 'smallint', unsigned: true })
  from: number;

  @Column({ nullable: true, unique: true, type: 'smallint', unsigned: true })
  to: number;

  @Column({ type: 'float', unsigned: true })
  price: number;

  @ManyToOne(() => Calculator, (calculator) => calculator.distancePrices, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'calculator_id' })
  calculator: Calculator;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
