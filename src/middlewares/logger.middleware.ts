import { Logger } from '@nestjs/common';
import { Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/ban-types
export function logger(req: Request, res: Response, next: Function) {
  const logger = new Logger();

  logger.log('log');

  next();
}
