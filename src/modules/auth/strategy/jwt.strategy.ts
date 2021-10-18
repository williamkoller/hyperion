import { UserEntity } from '@/infra/typeorm/entities/user-entity/user.entity';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthPayloadType } from '@/modules/auth/types/auth-payload/auth-payload.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersRepo: UsersRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  public async validate(authPayloadType: AuthPayloadType): Promise<UserEntity> {
    const user = await this.usersRepo.loadById(authPayloadType.id);
    if (!user) {
      throw new UnauthorizedException('Unauthorized user.');
    }
    return user;
  }
}
