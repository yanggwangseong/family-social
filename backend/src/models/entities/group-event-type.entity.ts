import { Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { EventType, Union } from '@/types';

import { CreatedUpdatedAtEntity } from './common/created-updated-at.entity';
import { GroupEventEntity } from './group-event.entity';

@Entity({ name: 'fam_group_event_type' })
export class GroupEventTypeEntity extends CreatedUpdatedAtEntity {
	@PrimaryColumn({
		type: 'varchar',
		length: 50,
	})
	groupEventType!: Union<typeof EventType>;

	@OneToMany(() => GroupEventEntity, (ev) => ev.groupEventType)
	groupEvents!: GroupEventEntity[];
}
