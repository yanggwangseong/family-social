import { Injectable } from '@nestjs/common';
import { MembersRepository } from './members.repository';

@Injectable()
export class MembersService {
	constructor(private readonly membersRepository: MembersRepository) {}
}
