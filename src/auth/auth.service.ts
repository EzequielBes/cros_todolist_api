import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private validate: JwtStrategy
  ) {}

  async signIn(payload): Promise<any> {
    const token = {
      access_token: await this.jwtService.signAsync(payload),
    };
    return token;
  }

 async decoded(auth) {
   const [type, token] = auth?.split(' ') ?? []
      if(type !== 'Bearer') return undefined;
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      console.log(payload.account_id)
      return payload.account_id; 
}
}
