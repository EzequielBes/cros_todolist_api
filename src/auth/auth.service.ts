import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

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

 async decoded(payload) {
    const toke = await this.jwtService.verify(payload)
    console.log(toke)
    return toke
 }
}
