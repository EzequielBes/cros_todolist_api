import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

export class EncodedTokenUtil {
  static decodeToken(token: string): any {
    try {
      const jwtService = new JwtService();
      return jwtService.decode(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
