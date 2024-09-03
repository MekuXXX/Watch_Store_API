import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  logger = new Logger();

  constructor() {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    const status = exception.getStatus ? exception.getStatus() : 500;

    let message = 'Internal Server Error';

    if (exception.getResponse) {
      message = (exception.getResponse() as { message: string }).message;
    }

    this.logger.error(
      `${req.method} | ${req.path} | ${status} -> ${exception.message}`,
    );

    res.status(status).json({ success: false, message });
  }
}
