import { MentionCreateReqDto } from '@/models/dto/mention/req/mention-create-req.dto';
import { MentionEntity } from '@/models/entities/mention.entity';

import { MentionType, Union } from '../index';

export interface ICreateMentionArgs
	extends Pick<MentionEntity, 'mentionSenderId' | 'mentionFeedId'> {
	mentionType: Union<typeof MentionType>;
	mentions: MentionCreateReqDto[];
}
