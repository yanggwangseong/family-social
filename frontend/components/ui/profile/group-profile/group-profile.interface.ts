import { GroupResponse } from '@/shared/interfaces/group.interface';

export interface GroupProfileProps {
	group: GroupResponse;
	onSelectedGroup?: (groupId: string) => void;
	isSelecteGroup?: string;
}
