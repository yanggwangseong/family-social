import { FamEntity } from '@/entities/fam.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FamsController } from './fams.controller';
import { FamsService } from './fams.service';
import { FamsRepository } from './fams.repository';

@Module({
	imports: [TypeOrmModule.forFeature([FamEntity])],
	controllers: [FamsController],
	providers: [FamsService, FamsRepository],
	exports: [FamsService],
})
export class FamsModule {}
