import { Column, Entity } from 'typeorm';

import { MentionType, Union } from '@/types';

import { DefaultEntity } from './common/default.entity';

@Entity({ name: 'fam_mention' })
export class MentionEntity extends DefaultEntity {
	@Column({
		type: 'enum',
		enum: MentionType,
	})
	mentionType!: Union<typeof MentionType>;
}
