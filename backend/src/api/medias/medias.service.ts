import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';

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
		qr?: QueryRunner,
	): Promise<[boolean, void]> {
		return this.mediasRepository.updateFeedMedias(media, feedId, qr);
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
}
