import config from '@@src/config';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
const jwtService = new JwtService();

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor() {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const allowJwt = request.headers['authorization-jwt'];
    if (!allowJwt) {
      return false;
    }

    try {
      jwtService.verify(allowJwt, {
        secret: config.allowJwtSecret,
      });
    } catch (error) {
      return false;
    }

    // Ici, vous pouvez ajouter une logique supplémentaire pour vérifier la validité du JWT si nécessaire

    return true;
  }
}
