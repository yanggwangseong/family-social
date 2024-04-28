import { Injectable } from '@nestjs/common';

import { MentionTypeRepository } from '@/models/repositories/mention-type.repository';
import { MentionsRepository } from '@/models/repositories/mentions.repository';

@Injectable()
export class MentionsService {
	constructor(
		private readonly mentionsRepository: MentionsRepository,
		private readonly mentionTypeRepository: MentionTypeRepository,
	) {}
}
