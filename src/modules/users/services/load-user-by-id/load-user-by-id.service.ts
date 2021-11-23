import { UserEntity } from '@/infra/typeorm/entities/user-entity/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { UserOutputType } from '../../types/user-output/user-output.type';
import { userTransformer } from '../../transformers/users.transformer';

@Injectable()
export class LoadUserByIdService {
  constructor(private readonly usersRepo: UsersRepository) {}

  public async loadById(id: number): Promise<UserOutputType> {
    const userFound = await this.usersRepo.loadById(id);

    if (!userFound) {
      throw new NotFoundException('user not found.');
    }

    return userTransformer(userFound);
  }
}
