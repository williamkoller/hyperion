import { UserEntity } from '@/infra/typeorm/entities/user-entity/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { userTransformer } from '../../transformers/users.transformer';
import { UserOutputType } from '../../types/user-output/user-output.type';

@Injectable()
export class LoadUserByEmailService {
  constructor(private readonly usersRepo: UsersRepository) {}

  public async loadEmailAlreadyInUse(email: string): Promise<UserEntity> {
    const user = await this.usersRepo.loadByEmail(email);

    if (user) {
      throw new HttpException(
        'this email is already in use',
        HttpStatus.CONFLICT,
      );
    }

    return user;
  }

  public async loadEmailIsNotFound(email: string): Promise<UserOutputType> {
    const user = await this.usersRepo.loadByEmail(email);

    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }

    return userTransformer(user);
  }
}
