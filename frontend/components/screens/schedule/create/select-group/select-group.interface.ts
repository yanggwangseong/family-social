import { MemberBelongToGroupsResponse } from '@/shared/interfaces/group.interface';
import { Union, schdulePages } from 'types';

export interface SelectGroupProps {
	onChangePage: (page: Union<typeof schdulePages>) => void;
	data: MemberBelongToGroupsResponse[];
	handleSelectedGroup: (groupId: string) => void;
	isSelecteGroup: string;
}
