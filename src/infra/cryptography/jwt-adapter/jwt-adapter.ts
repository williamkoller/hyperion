import { Decrypter, Encrypter } from '@/data/protocols/criptography';
import { VerifyTokenType } from '@/modules/auth/types/verify-token/verify-token.type';
import { UserOutputType } from '@/modules/users/types/user-output/user-output.type';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

type JwtPayloadType = {
  id: number;
  name: string;
  surname: string;
  email: string;
};

@Injectable()
export class JwtAdapter implements Encrypter, Decrypter {
  constructor(private readonly jwtService: JwtService) {}
  public async encrypt(user: UserOutputType): Promise<string> {
    const jwtPayloadType: JwtPayloadType = {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
    };
    return this.jwtService.signAsync(jwtPayloadType);
  }

  public async decrypt(token: string): Promise<VerifyTokenType> {
    return this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
  }
}
