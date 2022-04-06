import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 150, unique: true })
  email: string;

  @Column({ nullable: true, type: 'varchar', length: 80 })
  password: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 8);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  toResponse() {
    const user = new User();
    user.email = this.email;
    return user;
  }

  regularData() {
    delete this.password;
    delete this.createdAt;
    delete this.updatedAt;
    return this;
  }

  withoutPass() {
    delete this.password;
    return this;
  }
}
