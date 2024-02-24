import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FeedMediaEntity } from '@/models/entities/feed-media.entity';
import { MediasRepository } from '@/models/repositories/medias.repository';

import { MediasService } from './medias.service';

@Module({
	imports: [TypeOrmModule.forFeature([FeedMediaEntity])],
	controllers: [],
	providers: [MediasService, MediasRepository],
	exports: [MediasService],
})
export class MediasModule {}
