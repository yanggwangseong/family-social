import { GroupProfileResponse } from '@/shared/interfaces/group.interface';

export interface GroupProfileProps {
	group: GroupProfileResponse;
	onSelectedGroup?: (groupId: string) => void;
	isSelecteGroup?: string;
}
