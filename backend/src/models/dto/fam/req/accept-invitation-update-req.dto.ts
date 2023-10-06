import { FamEntity } from '@/models/entities/fam.entity';
import { PickType } from '@nestjs/swagger';

export class AcceptInvitationUpdateReqDto extends PickType(FamEntity, [
	'invitationAccepted',
]) {}
