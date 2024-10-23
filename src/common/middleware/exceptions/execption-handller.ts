import config from '@@src/config';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import axios from 'axios';
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    const errorMessage = `
path: ${request.path}
params: ${JSON.stringify(request.params)}
body: ${JSON.stringify(request.body)}
status: ${status}
message: ${message}
exception: ${exception}
              `;
    if (config.serverMode === 'development') {
      axios.post(
        config.slack.errorChannelWebhookUrl,
        {
          text: errorMessage,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }
    if (config.serverMode === 'local') {
      console.error(errorMessage);
      console.info('--------------------------------');
      console.error(exception);
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
