import { Injectable } from '@nestjs/common';

import { MentionTypeRepository } from '@/models/repositories/mention-type.repository';
import { MentionsRepository } from '@/models/repositories/mentions.repository';
import { MentionType, Union } from '@/types';
import { ICreateMentionArgs } from '@/types/args/mention';

@Injectable()
export class MentionsService {
	constructor(
		private readonly mentionsRepository: MentionsRepository,
		private readonly mentionTypeRepository: MentionTypeRepository,
	) {}

	async findMentionIdByNotificationType(
		mentionType: Union<typeof MentionType>,
	) {
		const { mentionTypId } = await this.mentionTypeRepository.findMentionTypeId(
			mentionType,
		);

		return mentionTypId;
	}

	async createMentions(mentionArgs: ICreateMentionArgs) {
		const { mentionType, mentions, qr, ...rest } = mentionArgs;

		const mentionTypeId = await this.findMentionIdByNotificationType(
			mentionType,
		);

		await this.mentionsRepository.createMentions(
			mentions,
			{
				mentionTypeId,
				...rest,
			},
			qr,
		);
	}
}
