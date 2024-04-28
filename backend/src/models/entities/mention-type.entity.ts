import { Column, Entity } from 'typeorm';

import { MentionType, Union } from '@/types';

@Entity({ name: 'fam_mention_type' })
export class MentionTypeEntity {
	@Column({
		type: 'enum',
		enum: MentionType,
	})
	notificationType!: Union<typeof MentionType>;
}
