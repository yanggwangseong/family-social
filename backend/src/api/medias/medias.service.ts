import { MediaCreateReqDto } from '@/models/dto/media/req/media-create-req.dto';
import { MediasRepository } from '@/models/repositories/medias.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MediasService {
	constructor(private readonly mediasRepository: MediasRepository) {}

	async createFeedMedias(media: MediaCreateReqDto[], feedId: string) {
		return this.mediasRepository.createFeedMedias(media, feedId);
	}
}
