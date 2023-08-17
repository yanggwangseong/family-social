import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemberEntity } from '@/entities/member.entity';
import { ICreateMemberArgs } from '@/types/args/member';
import { v4 as uuidv4 } from 'uuid';
import { EntityNotFoundException } from '@/common/exception/service.exception';

@Injectable()
export class MembersRepository extends Repository<MemberEntity> {
	constructor(
		@InjectRepository(MemberEntity)
		private readonly repository: Repository<MemberEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async findMemberById({ memberId }: { memberId: string }) {
		const member = await this.repository.findOne({
			where: {
				id: memberId,
			},
			select: {
				username: true,
				id: true,
			},
		});

		// member가 null일 경우에 대한 처리는 생략
		return member; // null일 경우 컴파일 에러 발생하지 않음
	}

	async findMemberByEmail({ email }: { email: string }) {
		return this.repository.findOne({
			where: {
				email: email,
			},
			select: {
				username: true,
				id: true,
			},
		});
	}

	async createMember({ email, username, password }: ICreateMemberArgs) {
		const {
			identifiers: [{ id }],
		} = await this.repository.insert({
			id: uuidv4(),
			email: email,
			username: username,
			password: password,
		});

		return this.findMemberById({ memberId: id });
	}
}
