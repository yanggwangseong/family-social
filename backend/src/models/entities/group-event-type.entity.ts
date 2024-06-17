import { ApiProperty } from '@nestjs/swagger';
import {
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryColumn,
	UpdateDateColumn,
} from 'typeorm';

import { EventType, Union } from '@/types';

import { GroupEventEntity } from './group-event.entity';

@Entity({ name: 'fam_group_event_type' })
export class GroupEventTypeEntity {
	@PrimaryColumn({
		type: 'varchar',
		length: 50,
	})
	groupEventType!: Union<typeof EventType>;

	@ApiProperty()
	@CreateDateColumn({
		type: 'timestamp',
		precision: 3,
		default: () => 'CURRENT_TIMESTAMP',
	})
	createdAt!: Date;

	@ApiProperty()
	@UpdateDateColumn({
		type: 'timestamp',
		precision: 3,
		default: () => 'CURRENT_TIMESTAMP',
	})
	updatedAt!: Date;

	@OneToMany(() => GroupEventEntity, (ev) => ev.groupEventType)
	groupEvents!: GroupEventEntity[];
}
