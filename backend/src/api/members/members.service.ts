import { Injectable } from '@nestjs/common';
import { MembersRepository } from './members.repository';
import { EntityNotFoundException } from '@/common/exception/service.exception';
import { MemberResDto } from '@/dto/member/res/member-res.dto';

@Injectable()
export class MembersService {
	constructor(private readonly membersRepository: MembersRepository) {}

	async findMemberByIdOrThrow(memberId: string): Promise<MemberResDto> {
		const member = await this.membersRepository.findMemberById({
			memberId,
		});

		if (!member) {
			throw EntityNotFoundException('유저를 찾을 수 없습니다.');
		}

		return member;
	}
}
