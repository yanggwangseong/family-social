import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { v4 as uuidv4 } from 'uuid';

import { MediaCreateReqDto } from '@/models/dto/media/req/media-create-req.dto';
import { MediaUpdateReqDto } from '@/models/dto/media/req/media-update-req-dto';
import { FeedMediaEntity } from '@/models/entities/feed-media.entity';
import { MediasRepository } from '@/models/repositories/medias.repository';

@Injectable()
export class MediasService {
	constructor(private readonly mediasRepository: MediasRepository) {}

	async createFeedMedias(
		media: MediaCreateReqDto[],
		feedId: string,
		qr?: QueryRunner,
	): Promise<void> {
		return this.mediasRepository.createFeedMedias(
			this.createNewMedias(media, feedId),
			qr,
		);
	}

	async updateFeedMedias(
		media: MediaUpdateReqDto[],
		feedId: string,
		qr?: QueryRunner,
	) {
		await Promise.all([
			await this.mediasRepository.deleteFeedMediasByFeedId(feedId, qr),
			await this.mediasRepository.createFeedMedias(
				this.createNewMedias(media, feedId),
				qr,
			),
		]);
	}

	async deleteFeedMediasByFeedId(
		feedId: string,
		qr?: QueryRunner,
	): Promise<boolean> {
		return this.mediasRepository.deleteFeedMediasByFeedId(feedId, qr);
	}

	async findMediaUrlByFeedId(
		feedId: string,
	): Promise<{ url: string; id: string }[]> {
		return await this.mediasRepository.findMediaUrlByFeedId(feedId);
	}

	private createNewMedias(media: MediaUpdateReqDto[], feedId: string) {
		return media.map(
			({ url, position }): QueryDeepPartialEntity<FeedMediaEntity> => {
				return {
					id: uuidv4(),
					url: url,
					position: position,
					feedId,
				};
			},
		);
	}
}
