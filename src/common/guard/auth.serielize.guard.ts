import config from '@@src/config';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthSerializeGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    if (config.serverMode === 'local') {
      request.user = { id: 11 };
      return true;
    }

    if (!request.session || !request.session.userId) {
      throw new UnauthorizedException();
    }

    if (request.session && request.session.userId) {
      request.user = { id: request.session.userId };
    }

    return true;
  }
}
