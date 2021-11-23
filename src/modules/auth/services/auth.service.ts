import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypt-adapter';
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter/jwt-adapter';
import { LoadUserByEmailService } from '@/modules/users/services/load-user-by-email/load-user-by-email.service';
import { userTransformer } from '@/modules/users/transformers/users.transformer';
import { LastLogged } from '@/utils/last-logged/last-logged';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthInputDto } from '../dtos/auth-input/auth-input.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly bcryptAdapter: BcryptAdapter,
    private readonly jwtAdapter: JwtAdapter,
    private readonly loadUserByEmailService: LoadUserByEmailService,
    private readonly lastLogged: LastLogged,
  ) {}

  public async login(
    authInputDto: AuthInputDto,
  ): Promise<{ accessToken: string }> {
    const user = await this.loadUserByEmailService.loadEmailIsNotFound(
      authInputDto.email,
    );

    const { id: userId, password } = user;

    const isValid = await this.bcryptAdapter.compare(
      authInputDto.password,
      password,
    );

    if (!isValid) {
      throw new HttpException(
        'Incorrect password or email.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    await this.lastLogged.updateLastLogged(userId);

    const accessToken = await this.jwtAdapter.encrypt(user);

    return {
      accessToken,
    };
  }
}
