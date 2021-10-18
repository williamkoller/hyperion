import { UserEntity } from '@/infra/typeorm/entities/user-entity/user.entity';
import { Injectable } from '@nestjs/common';
import { AddUserDto } from '@/modules/users/dtos/add-user/add-user.dto';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { LoadUserByEmailService } from '@/modules/users/services/load-user-by-email/load-user-by-email.service';
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypt-adapter';

@Injectable()
export class AddUserService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly loadUserByEmailService: LoadUserByEmailService,
    private readonly bcryptAdapter: BcryptAdapter,
  ) {}

  public async addUser(addUserDto: AddUserDto): Promise<UserEntity> {
    await this.loadUserByEmailService.loadEmailAlreadyInUse(addUserDto.email);

    const userData = {
      ...addUserDto,
      password: await this.bcryptAdapter.hash(addUserDto.password),
    };

    return await this.usersRepo.add(userData);
  }
}
