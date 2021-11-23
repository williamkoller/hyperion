import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class LastLogged {
  constructor(private readonly usersRepo: UsersRepository) {}

  public async updateLastLogged(id: number): Promise<void> {
    const user = await this.usersRepo.loadById(id);

    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    const lastLogged = new Date();
    return await this.usersRepo.lastLogged(id, lastLogged);
  }
}
