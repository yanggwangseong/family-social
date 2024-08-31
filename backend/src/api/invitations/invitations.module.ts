import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FamEntity } from '@/models/entities/fam.entity';

import { InvitationsController } from './invitations.controller';
import { InvitationsService } from './invitations.service';
import { FamsModule } from '../fams/fams.module';

@Module({
	imports: [TypeOrmModule.forFeature([FamEntity]), FamsModule],
	controllers: [InvitationsController],
	providers: [InvitationsService],
	exports: [InvitationsService],
})
export class InvitationsModule {}
