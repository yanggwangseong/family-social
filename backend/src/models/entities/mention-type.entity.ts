import { Column, Entity, OneToMany, Unique } from 'typeorm';

import { MentionType, Union } from '@/types';

import { DefaultEntity } from './common/default.entity';
import { MentionEntity } from './mention.entity';

@Unique(['mentionType'])
@Entity({ name: 'fam_mention_type' })
export class MentionTypeEntity extends DefaultEntity {
	@Column({
		type: 'enum',
		enum: MentionType,
	})
	mentionType!: Union<typeof MentionType>;

	@OneToMany(() => MentionEntity, (mt) => mt.mentionType)
	mentions!: MentionEntity[];
}
