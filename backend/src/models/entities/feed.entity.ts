import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { DefaultEntity } from './common/default.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { LikeFeedEntity } from './fam-like-feed.entity';
import { FeedMediaEntity } from './fam-feed-media.entity';
import { GroupEntity } from './group.entity';
import { MemberEntity } from './member.entity';

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

	@ApiProperty()
	@IsNotEmpty()
	@IsUUID()
	public readonly groupId!: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsUUID()
	public readonly memberId!: string;

	@OneToMany(() => LikeFeedEntity, (lf) => lf.feed)
	LikedByMembers?: LikeFeedEntity[];

	@OneToMany(() => FeedMediaEntity, (fm) => fm.feed)
	medias?: FeedMediaEntity[];

	@ManyToOne((type) => GroupEntity, (gr) => gr.feedByGroups)
	@JoinColumn({ name: 'groupId', referencedColumnName: 'id' })
	group!: GroupEntity;

	@ManyToOne((type) => MemberEntity, (mb) => mb.memberCreateFeeds)
	@JoinColumn({ name: 'memberId', referencedColumnName: 'id' })
	member!: MemberEntity;
}
