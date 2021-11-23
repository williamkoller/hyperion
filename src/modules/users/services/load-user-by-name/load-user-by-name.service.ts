import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { UserOutputType } from '../../types/user-output/user-output.type';
import { userTransformer } from '../../transformers/users.transformer';

@Injectable()
export class LoadUserByNameService {
  constructor(private readonly usersRepo: UsersRepository) {}

  public async loadUserByName(name: string): Promise<UserOutputType> {
    const user = await this.usersRepo.loadUserByName(name);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return userTransformer(user);
  }
}
