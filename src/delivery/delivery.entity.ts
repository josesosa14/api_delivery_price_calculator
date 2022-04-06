import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Delivery extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty()
  @Column()
  date: Date;

  @ApiProperty()
  @Column({ type: 'float', unsigned: true })
  distance: number;

  @ApiProperty()
  @Column({ name: 'count_packages', type: 'smallint', unsigned: true })
  countPackages: number;

  @ApiProperty()
  @Column({ name: 'first_name', type: 'varchar', length: 50 })
  firstName: string;

  @ApiProperty()
  @Column({ name: 'last_name', type: 'varchar', length: 50 })
  lastName: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 150 })
  email: string;

  @Column({ type: 'varchar', length: 30 })
  phone: string;

  @ApiProperty()
  @Column({ name: 'total_price', type: 'float', unsigned: true })
  totalPrice: number;

  @ApiProperty()
  @Column({ name: 'extra_weekend', type: 'float', unsigned: true })
  extraWeekend: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
