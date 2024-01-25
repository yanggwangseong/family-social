import { PickType } from '@nestjs/swagger';

import { FamEntity } from '@/models/entities/fam.entity';

export class AcceptInvitationUpdateReqDto extends PickType(FamEntity, [
	'invitationAccepted',
]) {}
