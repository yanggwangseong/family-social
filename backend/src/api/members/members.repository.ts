import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemberEntity } from '@/entities/member.entity';
import { ICreateMemberArgs, ILoginMemberArgs } from '@/types/args/member';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MembersRepository extends Repository<MemberEntity> {
	constructor(
		@InjectRepository(MemberEntity)
		private readonly repository: Repository<MemberEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async signInUser({ email }: ILoginMemberArgs) {
		return await this.repository.findOne({
			select: {
				username: true,
				id: true,
				password: true,
			},
			where: {
				email: email,
			},
		});
	}

	async findsignupVerifyTokenByEmail({ email }: { email: string }) {
		return await this.repository.findOne({
			where: {
				email: email,
			},
			select: {
				signupVerifyToken: true,
				username: true,
			},
		});
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

		return member;
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

	async createMember(
		{ email, username, password }: ICreateMemberArgs,
		signupVerifyToken: string,
	) {
		const insertResult = await this.repository.insert({
			id: uuidv4(),
			email: email,
			username: username,
			password: password,
			signupVerifyToken: signupVerifyToken,
		});

		const id: string = insertResult.identifiers[0].id; // 타입 명시

		return this.findMemberById({ memberId: id });
	}
}
