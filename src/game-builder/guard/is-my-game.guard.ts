import { PrismaService } from '@@prisma/prisma.service';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class IsMyGameGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { gameId } = request.params;
    const { user } = request;

    const game = await this.prismaService.game.findUnique({
      where: { id: Number(gameId), userId: user.id },
    });

    if (!game) {
      throw new NotFoundException('로그인 유저의 게임이 아닙니다.');
    }

    return true;
  }
}
