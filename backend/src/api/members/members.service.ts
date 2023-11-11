import { Injectable } from '@nestjs/common';
import { MembersRepository } from '@/models/repositories/members.repository';
import { EntityNotFoundException } from '@/common/exception/service.exception';
import { MemberResDto } from '@/models/dto/member/res/member-res.dto';
import { ERROR_USER_NOT_FOUND } from '@/constants/business-error';
import { IUpdateMemberArgs } from '@/types/args/member';

@Injectable()
export class MembersService {
	constructor(private readonly membersRepository: MembersRepository) {}

	async findMemberByIdOrThrow(memberId: string): Promise<MemberResDto> {
		const member = await this.membersRepository.findMemberById({
			memberId,
		});

		if (!member) {
			throw EntityNotFoundException(ERROR_USER_NOT_FOUND);
		}

		return member;
	}

	async updateMemberProfile({
		memberId,
		username,
		phoneNumber,
		profileImage,
	}: IUpdateMemberArgs) {
		return await this.membersRepository.updateMemberProfile({
			memberId,
			username,
			phoneNumber,
			profileImage,
		});
	}
}
