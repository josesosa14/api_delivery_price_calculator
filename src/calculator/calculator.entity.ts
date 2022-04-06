import { DistancePrice } from './distancePrice.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Calculator extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty()
  @Column({ name: 'base_price', type: 'float', unsigned: true })
  basePrice: number;

  @ApiProperty()
  @Column({ name: 'aditional_package', type: 'float', unsigned: true })
  additionalPackage: number;

  @OneToMany(() => DistancePrice, (distancePrice) => distancePrice.calculator, {
    onDelete: 'CASCADE',
  })
  distancePrices: DistancePrice[];

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
