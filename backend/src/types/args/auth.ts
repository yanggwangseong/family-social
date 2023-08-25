import { Response } from 'express';

export interface ITokenInCookieArgs {
	type: string;
	token: string;
	res: Response;
}
