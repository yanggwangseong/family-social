import { Repository } from 'typeorm';
import { FeedMediaEntity } from '../entities/fam-feed-media.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MediaCreateReqDto } from '../dto/media/req/media-create-req.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MediasRepository extends Repository<FeedMediaEntity> {
	constructor(
		@InjectRepository(FeedMediaEntity)
		private readonly repository: Repository<FeedMediaEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async createFeedMedias(media: MediaCreateReqDto[], feedId: string) {
		media.map(async (media: MediaCreateReqDto) => {
			await this.repository.insert({
				id: uuidv4(),
				url: media.url,
				position: media.position,
				feedId: feedId,
			});
		});
	}
}
