import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(credentials: { username: string; password: string }) {
    // For demo purposes ;)
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      const token = this.jwtService.sign({ username: credentials.username });
      return { token };
    }
    throw new UnauthorizedException('Invalid credentials');
  }
} 