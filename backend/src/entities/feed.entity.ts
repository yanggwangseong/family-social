import { Column, Entity, OneToMany } from 'typeorm';
import { DefaultEntity } from './common/default.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { LikeFeedEntity } from './fam-like-feed.entity';
import { FeedMediaEntity } from './fam-feed-media.entity';

@Entity({ name: 'fam_feed' })
export class FeedEntity extends DefaultEntity {
	@Column({ type: 'text', nullable: false })
	@ApiProperty({
		nullable: false,
	})
	@IsNotEmpty()
	@IsString()
	contents!: string;

	@Column({ type: 'boolean', nullable: false, default: true })
	@ApiProperty({
		nullable: false,
	})
	isPublic!: boolean;

	@OneToMany(() => LikeFeedEntity, (lf) => lf.feed)
	LikedByMembers?: LikeFeedEntity[];

	@OneToMany(() => FeedMediaEntity, (fm) => fm.feed)
	medias?: FeedMediaEntity[];
}
