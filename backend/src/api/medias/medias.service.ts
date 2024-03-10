import { Injectable } from '@nestjs/common';
import { EntityManager, QueryRunner } from 'typeorm';

import { MediaCreateReqDto } from '@/models/dto/media/req/media-create-req.dto';
import { MediaUpdateReqDto } from '@/models/dto/media/req/media-update-req-dto';
import { MediasRepository } from '@/models/repositories/medias.repository';

@Injectable()
export class MediasService {
	constructor(private readonly mediasRepository: MediasRepository) {}

	async createFeedMedias(
		media: MediaCreateReqDto[],
		feedId: string,
		qr?: QueryRunner,
	): Promise<void> {
		return this.mediasRepository.createFeedMedias(media, feedId, qr);
	}

	async updateFeedMedias(
		media: MediaUpdateReqDto[],
		feedId: string,
	): Promise<[boolean, void]> {
		return this.mediasRepository.updateFeedMedias(media, feedId);
	}

	async deleteFeedMediasByFeedId(
		feedId: string,
		manager: EntityManager,
	): Promise<boolean> {
		return this.mediasRepository.deleteFeedMediasByFeedId(feedId, manager);
	}

	async findMediaUrlByFeedId(
		feedId: string,
	): Promise<{ url: string; id: string }[]> {
		return await this.mediasRepository.findMediaUrlByFeedId(feedId);
	}
}
