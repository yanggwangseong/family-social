import { GroupAccessLevelUnionType } from '@/shared/interfaces/fam.interface';

export interface GroupDetailSidebarProps {
	groupId: string;
	groupAccessLevel: GroupAccessLevelUnionType;
	handleFollowLayerModal: () => void;
}
