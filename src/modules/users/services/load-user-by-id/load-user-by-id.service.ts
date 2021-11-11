import { UserEntity } from '@/infra/typeorm/entities/user-entity/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '@/modules/users/repositories/users.repository';

@Injectable()
export class LoadUserByIdService {
  constructor(private readonly usersRepo: UsersRepository) {}

  public async loadById(id: number): Promise<UserEntity> {
    const userFound = await this.usersRepo.loadById(id);

    if (!userFound) {
      throw new NotFoundException('user not found.');
    }

    return userFound;
  }
}
