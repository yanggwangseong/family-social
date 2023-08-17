import {
	EntityConflictException,
	EntityNotFoundException,
} from '@/common/exception/service.exception';
import { Injectable } from '@nestjs/common';
import { MembersRepository } from './members.repository';
import { ICreateMemberArgs } from '@/types/args/member';
import { MemberResDto } from '@/dto/member/res/member-res.dto';

@Injectable()
export class MembersService {
	constructor(private readonly membersRepository: MembersRepository) {}

	async createMember(dto: ICreateMemberArgs): Promise<MemberResDto> {
		const member = await this.membersRepository.findMemberByEmail({
			email: dto.email,
		});
		if (member)
			throw EntityConflictException(
				'해당 이메일에 해당하는 유저가 존재 합니다.',
			);

		const newMember = await this.membersRepository.createMember(dto);
		if (!newMember)
			throw EntityNotFoundException('생성한 유저를 찾을 수 없습니다.');
		return newMember;
	}
}
