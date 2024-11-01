import {
	GroupAccessLevelResponse,
	GroupDetailResponse,
} from '@/shared/interfaces/fam.interface';

export interface GroupDetailSidebarProps {
	groupId: string;
	groupAccessLevel: GroupAccessLevelResponse;
}
