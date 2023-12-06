import { MemberBelongToGroupsResponse } from '@/shared/interfaces/group.interface';

export interface SelectGroupProps {
	onChangePage: (page: string) => void;
	data: MemberBelongToGroupsResponse[];
	handleSelectedGroup: (groupId: string) => void;
	isSelecteGroup: string;
}
