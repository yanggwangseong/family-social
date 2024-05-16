import { ApiProperty, PickType } from '@nestjs/swagger';

import { ScheduleEntity } from '@/models/entities/schedule.entity';

import { FamSharedMemberResDto } from '../../fam/res/fam-shared-member-res.dto';

export class ScheduleGetListResDto extends PickType(ScheduleEntity, [
	'id',
	'groupId',
	'scheduleImage',
	'scheduleName',
	'startPeriod',
	'endPeriod',
	'updatedAt',
] as const) {
	@ApiProperty({
		nullable: false,
		type: [FamSharedMemberResDto],
	})
	sharedMembers!: FamSharedMemberResDto[];
}
