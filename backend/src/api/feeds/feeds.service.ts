import { FeedsRepository } from '@/models/repositories/feeds.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FeedsService {
	constructor(private readonly feedsRepository: FeedsRepository) {}
}
