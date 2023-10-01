import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemberEntity } from '@/entities/member.entity';
import { ICreateMemberArgs, ILoginMemberArgs } from '@/types/args/member';
import { v4 as uuidv4 } from 'uuid';
import { MemberResDto } from '@/dto/member/res/member-res.dto';

@Injectable()
export class MembersRepository extends Repository<MemberEntity> {
	constructor(
		@InjectRepository(MemberEntity)
		private readonly repository: Repository<MemberEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async updateRefreshToken({
		memberId,
		refreshToken,
	}: {
		memberId: string;
		refreshToken: string;
	}) {
		await this.update({ id: memberId }, { refreshToken: refreshToken });
		return this.findMemberById({ memberId: memberId });
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

	async findMemberById({
		memberId,
	}: {
		memberId: string;
	}): Promise<MemberResDto | null> {
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

	async findRefreshTokenById({ memberId }: { memberId: string }) {
		const member = await this.repository.findOne({
			where: {
				id: memberId,
			},
			select: {
				username: true,
				id: true,
				refreshToken: true,
			},
		});

		return member;
	}

	async findMemberByEmail({
		email,
	}: {
		email: string;
	}): Promise<MemberResDto | null> {
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
		{ email, username, password, phoneNumber }: ICreateMemberArgs,
		signupVerifyToken: string,
	) {
		const insertResult = await this.repository.insert({
			id: uuidv4(),
			email: email,
			username: username,
			password: password,
			phoneNumber: phoneNumber,
			signupVerifyToken: signupVerifyToken,
		});

		const id: string = insertResult.identifiers[0].id; // 타입 명시

		return this.findMemberById({ memberId: id });
	}
}
