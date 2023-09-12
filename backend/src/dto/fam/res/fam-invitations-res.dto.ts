import { GroupResDto } from '@/dto/group/res/group-res.dto';
import { FamEntity } from '@/entities/fam.entity';
import { ApiProperty, PickType } from '@nestjs/swagger';

export class FamInvitationsResDto extends PickType(FamEntity, [
	'id',
	'invitationAccepted',
]) {
	@ApiProperty({
		description: '해당 그룹에 대한 정보',
	})
	group!: GroupResDto;
}
