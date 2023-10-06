import { FamEntity } from '@/models/entities/fam.entity';
import { PickType } from '@nestjs/swagger';

export class FamResDto extends PickType(FamEntity, [
	'id',
	'invitationAccepted',
] as const) {}
