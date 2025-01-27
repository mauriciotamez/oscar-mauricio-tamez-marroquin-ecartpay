import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, body, query, params } = req;
    const userAgent = req.get('user-agent') || '';
    const startTime = Date.now();

    this.logger.log(
      `[Incoming Request] ${method} ${originalUrl}
      Body: ${JSON.stringify(body)}
      Query: ${JSON.stringify(query)}
      Params: ${JSON.stringify(params)}
      User-Agent: ${userAgent}`
    );

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');
      const responseTime = Date.now() - startTime;

      this.logger.log(
        `[Response] ${method} ${originalUrl} ${statusCode}
        Response Time: ${responseTime}ms
        Content-Length: ${contentLength}
        Status: ${statusCode}`
      );
    });

    next();
  }
} 