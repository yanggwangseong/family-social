import { GroupDetailResponse } from '@/shared/interfaces/fam.interface';

export interface GroupDetailSidebarProps {
	groupId: string;
}

export interface GroupDetailSidebarPropsWithGroupDetail
	extends GroupDetailSidebarProps {
	groupDetail: GroupDetailResponse;
}
