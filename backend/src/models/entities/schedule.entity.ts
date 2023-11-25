import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DefaultEntity } from './common/default.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { GroupEntity } from './group.entity';
import { MemberEntity } from './member.entity';

@Entity({ name: 'fam_schedule' })
export class ScheduleEntity extends DefaultEntity {
	@Column({ type: 'uuid', nullable: false })
	@ApiProperty()
	@IsNotEmpty()
	@IsUUID()
	public readonly groupId!: string;

	@Column({ type: 'uuid', nullable: false })
	@ApiProperty()
	@IsNotEmpty()
	@IsUUID()
	public readonly memberId!: string;

	@ManyToOne((type) => GroupEntity, (gr) => gr.schedulesByGroup)
	@JoinColumn({ name: 'groupId', referencedColumnName: 'id' })
	group!: GroupEntity;

	@ManyToOne((type) => MemberEntity, (mb) => mb.memberCreateSchedules)
	@JoinColumn({ name: 'memberId', referencedColumnName: 'id' })
	member!: MemberEntity;
}
