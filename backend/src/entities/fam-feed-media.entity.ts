import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DefaultEntity } from './common/default.entity';
import { FeedEntity } from './feed.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Entity({ name: 'fam_feed_media' })
export class FeedMediaEntity extends DefaultEntity {
	/**
	 * 서버를 통해 한 번 전처리된 이미지
	 * example is @link {https://folder/test.jpg}
	 *
	 * @minLength 4
	 * @maxLength 2048
	 */
	@Column('varchar', { length: 2048 })
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	url!: string;

	/**
	 * 미디어파일의 정렬 순서로, 오름차순 정렬된다.
	 */
	@Column('numeric', { name: 'position', default: 0 })
	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	position!: number;

	@ManyToOne((type) => FeedEntity, (feed) => feed.medias)
	@JoinColumn({ name: 'feedId', referencedColumnName: 'id' })
	feed!: FeedEntity;
}
