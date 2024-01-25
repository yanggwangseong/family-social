import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FamEntity } from '@/models/entities/fam.entity';
import { FamsRepository } from '@/models/repositories/fams.repository';

import { FamsController } from './fams.controller';
import { FamsService } from './fams.service';

@Module({
	imports: [TypeOrmModule.forFeature([FamEntity])],
	controllers: [FamsController],
	providers: [FamsService, FamsRepository],
	exports: [FamsService],
})
export class FamsModule {}
