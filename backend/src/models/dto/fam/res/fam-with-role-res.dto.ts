import { PickType } from '@nestjs/swagger';

import { FamEntity } from '@/models/entities/fam.entity';

export class FamWithRoleResDto extends PickType(FamEntity, [
	'id',
	'invitationAccepted',
	'role',
] as const) {}
