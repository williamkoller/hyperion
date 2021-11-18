import { UserEntity } from '@/infra/typeorm/entities/user-entity/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from '@/modules/users/repositories/users.repository';

@Injectable()
export class LoadUserByNameService {
  constructor(private readonly usersRepo: UsersRepository) {}

  public async loadUserByName(name: string): Promise<UserEntity> {
    const user = await this.usersRepo.loadUserByName(name);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }
}
