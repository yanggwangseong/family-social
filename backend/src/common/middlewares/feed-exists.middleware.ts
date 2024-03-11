import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class FeedExistsMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		console.log('******feedId123=*******', req.params);
		next();
	}
}
