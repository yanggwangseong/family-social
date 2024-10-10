import { ApiProperty, PickType } from '@nestjs/swagger';

import { NotificationEntity } from '@/models/entities/notification.entity';

import { MemberSearchResDto } from '../../member/res/member-search-res.dto';

export class NotificationResDto extends PickType(NotificationEntity, [
	'id',
	'notificationTypeId',
	'recipientId',
	'senderId',
	'notificationTitle',
	'notificationDescription',
	'notificationFeedId',
	'isRead',
	'createdAt',
] as const) {
	@ApiProperty({
		nullable: false,
	})
	sender!: MemberSearchResDto;
}
