import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AuthGuard implements CanActivate {
  private prisma = new PrismaClient();

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    const accessToken = await this.prisma.accessToken.findUnique({
      where: { token },
    });

    if (!accessToken) {
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }
}
