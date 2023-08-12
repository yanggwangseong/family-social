import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
	constructor() {}

	async test() {
		return 'hellow2';
	}
}
