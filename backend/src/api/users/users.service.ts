import { EntityNotFoundException } from '@/common/exception/service.exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
	constructor() {}

	async test(args?: string) {
		if (!args) throw EntityNotFoundException('공지사항을 찾을 수 없습니다');
		return 'hellow2';
	}
}
