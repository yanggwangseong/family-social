import { Injectable } from '@nestjs/common';

import { EntityNotFoundException } from '@/common/exception/service.exception';
import { ERROR_USER_NOT_FOUND } from '@/constants/business-error';
import { MemberAccountResDto } from '@/models/dto/member/res/member-account-res.dto';
import { MemberProfileImageResDto } from '@/models/dto/member/res/member-profile-image-res.dto';
import { MemberResDto } from '@/models/dto/member/res/member-res.dto';
import { MemberSearchResDto } from '@/models/dto/member/res/member-search-res.dto';
import { MembersRepository } from '@/models/repositories/members.repository';
import { IUpdateMemberArgs } from '@/types/args/member';

@Injectable()
export class MembersService {
	constructor(private readonly membersRepository: MembersRepository) {}

	async findOneMemberByEmail(
		email: string,
		memberId: string,
	): Promise<MemberAccountResDto> {
		const member: Omit<MemberAccountResDto, 'isMine'> | null =
			await this.membersRepository.findMemberByEmail(email, {
				id: true,
				username: true,
				profileImage: true,
				phoneNumber: true,
			});

		if (!member) {
			throw EntityNotFoundException(ERROR_USER_NOT_FOUND);
		}

		return {
			...member,
			isMine: memberId === member.id ? true : false,
		};
	}

	async findMemberByIdOrThrow(
		memberId: string,
	): Promise<MemberProfileImageResDto> {
		const member = await this.membersRepository.findMemberById({
			memberId,
		});

		if (!member) {
			throw EntityNotFoundException(ERROR_USER_NOT_FOUND);
		}

		return member;
	}

	async findAllMembers(
		authorMemberId: string,
		groupIds: string[],
	): Promise<MemberSearchResDto[]> {
		return await this.membersRepository.findAllMembers(
			authorMemberId,
			groupIds,
		);
	}

	async findMembersByUserName(
		username: string,
		authorMemberId: string,
		groupIds: string[],
	): Promise<MemberSearchResDto[]> {
		return await this.membersRepository.findMembersByUserName(
			username,
			authorMemberId,
			groupIds,
		);
	}

	async findGroupIdsBelongToMyGroup(memberId: string) {
		return await this.membersRepository.findGroupIdsBelongToMyGroup(memberId);
	}

	async updateMemberProfile(updateMemberArgs: IUpdateMemberArgs) {
		return await this.membersRepository.updateMemberProfile({
			...updateMemberArgs,
		});
	}

	async memberExistsByEmail(
		email: string,
	): Promise<(MemberResDto & { isFirstLogin: boolean }) | null> {
		return await this.membersRepository.findMemberByEmail(email, {
			id: true,
			username: true,
			isFirstLogin: true,
		});
	}
}
