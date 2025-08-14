import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const started = Date.now();
    const ts = new Date().toISOString();
    res.on('finish', () => {
      const ms = Date.now() - started;
      console.log(
        `${ts} ${req.method} ${req.originalUrl} ${res.statusCode} ${ms}ms`,
      );
    });
    next();
  }
}
