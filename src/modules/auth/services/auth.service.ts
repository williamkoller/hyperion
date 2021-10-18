import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypt-adapter';
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter/jwt-adapter';
import { LoadUserByEmailService } from '@/modules/users/services/load-user-by-email/load-user-by-email.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthInputDto } from '../dtos/auth-input/auth-input.dto';
import { AuthOutputType } from '../types/auth-output/auth-output.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly bcryptAdapter: BcryptAdapter,
    private readonly jwtAdapter: JwtAdapter,
    private readonly loadUserByEmailService: LoadUserByEmailService,
  ) {}

  public async login(authInputDto: AuthInputDto): Promise<AuthOutputType> {
    const user = await this.loadUserByEmailService.loadEmailIsNotFound(
      authInputDto.email,
    );

    const isValid = await this.bcryptAdapter.compare(
      authInputDto.password,
      user.password,
    );

    if (!isValid) {
      throw new HttpException(
        'Incorrect password or email.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const accessToken = await this.jwtAdapter.encrypt(user);

    return {
      accessToken,
    };
  }
}
