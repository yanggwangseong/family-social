import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
	Brackets,
	FindOptionsSelect,
	In,
	Not,
	QueryRunner,
	Repository,
} from 'typeorm';

import { MemberResDto } from '@/models/dto/member/res/member-res.dto';
import { VerifyEmailResDto } from '@/models/dto/member/res/verify-email-res.dto';
import { MemberEntity } from '@/models/entities/member.entity';
import { ILoginMemberArgs, IUpdateMemberArgs } from '@/types/args/member';
import { OverrideInsertFeild } from '@/types/repository';

import { MemberByIdResDto } from '../dto/member/res/member-by-id-res.dto';
import { MemberProfileImageResDto } from '../dto/member/res/member-profile-image-res.dto';
import { MemberSearchResDto } from '../dto/member/res/member-search-res.dto';
import { GroupFollowEntity } from '../entities/group.follow.entity';

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

	async updateMemberCoverImage(memberId: string, imageUrl: string) {
		await this.update({ id: memberId }, { coverImage: imageUrl });
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

	async findAllMembers(
		authorMemberId: string,
		groupIds: string[],
	): Promise<MemberSearchResDto[]> {
		return await this.repository.find({
			select: {
				id: true,
				username: true,
				profileImage: true,
				email: true,
			},
			relations: {
				memberGroups: true,
			},
			where: {
				id: Not(authorMemberId),
				memberGroups: {
					groupId: In(groupIds),
					invitationAccepted: true,
				},
			},
		});
	}

	async findMembersByUserName(
		username: string,
		authorMemberId: string,
		groupIds: string[],
	): Promise<MemberSearchResDto[]> {
		// return await this.repository.find({
		// 	select: {
		// 		id: true,
		// 		username: true,
		// 		profileImage: true,
		// 		email: true,
		// 	},
		// 	relations: {
		// 		memberGroups: true,
		// 	},
		// 	where: {
		// 		username: ILike(`${username}%`),
		// 		id: Not(authorMemberId),
		// 		memberGroups: {
		// 			groupId: In(groupIds),
		// 			invitationAccepted: true,
		// 		},
		// 	},
		// });

		// 상호 팔로우 그룹의 ID를 가져오는 서브쿼리 생성
		const mutualFollowSubQuery = this.manager
			.getRepository(GroupFollowEntity)
			.createQueryBuilder('gf1')
			.select('gf1.followedGroupId')
			.innerJoin(
				GroupFollowEntity,
				'gf2',
				'gf1.followingGroupId = gf2.followedGroupId AND gf1.followedGroupId = gf2.followingGroupId',
			)
			.where('gf1.followingGroupId IN (:...groupIds)', { groupIds });

		// 메인 쿼리 작성
		const members = await this.repository
			.createQueryBuilder('member')
			.distinct(true) // 중복 멤버 제거
			.select([
				'member.id',
				'member.username',
				'member.profileImage',
				'member.email',
			])
			.innerJoin('member.memberGroups', 'fam')
			.where('member.username ILIKE :username', { username: `${username}%` })
			.andWhere('member.id != :authorMemberId', { authorMemberId })
			.andWhere('fam.invitationAccepted = TRUE')
			.andWhere(
				new Brackets((qb) => {
					qb.where('fam.groupId IN (:...groupIds)', { groupIds }).orWhere(
						`fam.groupId IN (${mutualFollowSubQuery.getQuery()})`,
					);
				}),
			)
			.setParameters({ groupIds })
			.getMany();

		return members;
	}

	async findGroupIdsBelongToMyGroup(memberId: string) {
		return await this.repository
			.findOne({
				select: {
					id: true,
					memberGroups: {
						id: true,
						memberId: true,
						groupId: true,
					},
				},
				relations: {
					memberGroups: true,
				},
				where: {
					id: memberId,
					memberGroups: {
						invitationAccepted: true,
					},
				},
			})
			.then((data) => {
				if (!data)
					return {
						groupIds: [],
					};
				if (!data.memberGroups || data.memberGroups.length === 0) {
					return {
						groupIds: [],
					};
				}
				return {
					groupIds: data.memberGroups.map((data) => data.groupId),
				};
			});
	}

	async findMemberById({
		memberId,
		qr,
	}: {
		memberId: string;
		qr?: QueryRunner;
	}): Promise<MemberByIdResDto | null> {
		const membersRepository = this.getMembersRepository(qr);

		const member = await membersRepository.findOne({
			where: {
				id: memberId,
			},
			select: {
				username: true,
				id: true,
				profileImage: true,
				socialType: true,
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

	async findMemberByIdOrThrow(
		memberId: string,
		overrideSelectOptions: FindOptionsSelect<MemberEntity>,
	) {
		return this.repository.findOne({
			where: {
				id: memberId,
			},
			select: {
				...overrideSelectOptions,
			},
		});
	}

	async createMember(
		overrideInsertFeilds: OverrideInsertFeild<MemberEntity>,
		qr?: QueryRunner,
	): Promise<MemberProfileImageResDto | null> {
		const membersRepository = this.getMembersRepository(qr);

		const insertResult = await membersRepository.insert(overrideInsertFeilds);

		const id: string = insertResult.identifiers[0].id; // 타입 명시

		return this.findMemberById({ memberId: id, qr });
	}

	async updateMemberProfile({ memberId, ...rest }: IUpdateMemberArgs) {
		await this.update({ id: memberId }, { ...rest });
	}
}
