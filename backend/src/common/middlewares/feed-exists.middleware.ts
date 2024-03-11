import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class FeedExistsMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		console.log('******params=*******', req.params);
		next();
	}
}
