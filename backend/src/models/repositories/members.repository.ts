import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
	FindOptionsSelect,
	ILike,
	Not,
	QueryRunner,
	Repository,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { MemberResDto } from '@/models/dto/member/res/member-res.dto';
import { VerifyEmailResDto } from '@/models/dto/member/res/verify-email-res.dto';
import { MemberEntity } from '@/models/entities/member.entity';
import {
	ICreateMemberArgs,
	ILoginMemberArgs,
	IUpdateMemberArgs,
} from '@/types/args/member';

import { MemberProfileImageResDto } from '../dto/member/res/member-profile-image-res.dto';

@Injectable()
export class MembersRepository extends Repository<MemberEntity> {
	constructor(
		@InjectRepository(MemberEntity)
		private readonly repository: Repository<MemberEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	getMembersRepository(qr?: QueryRunner) {
		return qr
			? qr.manager.getRepository<MemberEntity>(MemberEntity)
			: this.repository;
	}

	async updateRefreshToken({
		memberId,
		...rest
	}: {
		memberId: string;
		refreshToken: string;
	}): Promise<MemberProfileImageResDto | null> {
		await this.update({ id: memberId }, { ...rest });
		return this.findMemberById({ memberId: memberId });
	}

	async signInUser({
		email,
	}: ILoginMemberArgs): Promise<(MemberResDto & { password?: string }) | null> {
		return await this.repository.findOne({
			select: {
				username: true,
				id: true,
				password: true,
			},
			relations: {
				memberGroups: true,
			},
			where: {
				email,
			},
		});
	}

	async findsignupVerifyTokenByEmail({
		email,
	}: {
		email: string;
	}): Promise<VerifyEmailResDto | null> {
		return await this.repository.findOne({
			where: {
				email,
			},
			select: {
				signupVerifyToken: true,
				username: true,
			},
		});
	}

	async findMembersByUserName(
		username: string,
		authorMemberId: string,
	): Promise<MemberProfileImageResDto[]> {
		return await this.repository.find({
			select: {
				id: true,
				username: true,
				profileImage: true,
			},
			relations: {
				memberGroups: true,
			},
			where: {
				username: ILike(`${username}%`),
				id: Not(authorMemberId),
			},
		});
	}

	async findMemberById({
		memberId,
	}: {
		memberId: string;
	}): Promise<MemberProfileImageResDto | null> {
		const member = await this.repository.findOne({
			where: {
				id: memberId,
			},
			select: {
				username: true,
				id: true,
				profileImage: true,
			},
		});

		return member;
	}

	async findRefreshTokenById({
		memberId,
	}: {
		memberId: string;
	}): Promise<(MemberResDto & { refreshToken?: string }) | null> {
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

	async findMemberByEmail(
		email: string,
		overrideSelectOptions: FindOptionsSelect<MemberEntity>,
	) {
		return this.repository.findOne({
			where: {
				email,
			},
			select: {
				...overrideSelectOptions,
			},
		});
	}

	async createMember(
		createMemberArgs: ICreateMemberArgs,
		signupVerifyToken: string,
		qr?: QueryRunner,
	): Promise<MemberProfileImageResDto | null> {
		const membersRepository = this.getMembersRepository(qr);

		const insertResult = await membersRepository.insert({
			id: uuidv4(),
			...createMemberArgs,
			signupVerifyToken: signupVerifyToken,
		});

		const id: string = insertResult.identifiers[0].id; // 타입 명시

		return this.findMemberById({ memberId: id });
	}

	async updateMemberProfile({ memberId, ...rest }: IUpdateMemberArgs) {
		await this.update({ id: memberId }, { ...rest });
	}
}
