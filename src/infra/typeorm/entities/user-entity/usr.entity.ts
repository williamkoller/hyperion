import { BeforeInsert, Column, Entity } from 'typeorm';
import { BaseEntity } from '@/infra/typeorm/entities/base-entity/base-entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  surname: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ name: 'last_logged', type: 'timestamp', nullable: true })
  lastLogged?: Date;

  @BeforeInsert()
  emailToLowerCase(): void {
    this.email = this.email.toLowerCase();
  }

  constructor(partial: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }
}
