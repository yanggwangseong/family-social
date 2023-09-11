import { MemberGroupEntity } from '@/entities/member-group.entity';
import { PickType } from '@nestjs/swagger';

export class AcceptInvitationUpdateReqDto extends PickType(MemberGroupEntity, [
	'invitationAccepted',
]) {}
