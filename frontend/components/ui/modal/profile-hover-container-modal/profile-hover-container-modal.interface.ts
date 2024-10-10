import { GroupProfileResponse } from '@/shared/interfaces/group.interface';
import { SearchMemberResponse } from '@/shared/interfaces/member.interface';

export interface ProfileHoverContainerModalProps {
	group?: GroupProfileResponse;
	member?: SearchMemberResponse;
	handleMouseOver: (index: number) => void;
	handleMouseOut: () => void;
	isHovering: number | null;
}
