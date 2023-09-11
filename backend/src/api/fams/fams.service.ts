import { Injectable } from '@nestjs/common';
import { FamsRepository } from './fams.repository';

@Injectable()
export class FamsService {
	constructor(private readonly famsRepository: FamsRepository) {}

	async CreateFamByMemberOfGroup({
		memberId,
		groupId,
	}: {
		memberId: string;
		groupId: string;
	}) {
		await this.famsRepository.createMemberGroup({
			memberId: memberId,
			groupId: groupId,
			role: 'user',
			invitationAccepted: false,
		});
		//[TODO] 그룹 초대 notification
	}
}
