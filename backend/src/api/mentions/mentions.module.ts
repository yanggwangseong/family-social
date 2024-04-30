import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MentionTypeEntity } from '@/models/entities/mention-type.entity';
import { MentionEntity } from '@/models/entities/mention.entity';
import { MentionTypeRepository } from '@/models/repositories/mention-type.repository';
import { MentionsRepository } from '@/models/repositories/mentions.repository';

import { MentionsService } from './mentions.service';

@Module({
	imports: [TypeOrmModule.forFeature([MentionEntity, MentionTypeEntity])],
	controllers: [],
	providers: [MentionsService, MentionsRepository, MentionTypeRepository],
	exports: [MentionsService],
})
export class MentionsModule {}
