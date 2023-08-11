import { UserEntity } from '@/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UserEntity)
		private usersRepository: Repository<UserEntity>,
	) {}

	async test() {
		const user = new UserEntity();
		user.id = uuidv4();
		user.name = 'test';
		const createUser = await this.usersRepository.save(user);
		return createUser;
	}
}
