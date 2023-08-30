import { MemberGroupEntity } from '@/entities/member-group.entity';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class AcceptInvitationUpdateReqDto extends PickType(MemberGroupEntity, [
	'invitationAccepted',
]) {
	@ApiProperty()
	@IsNotEmpty()
	@IsUUID()
	memberGroupId!: string;
}
