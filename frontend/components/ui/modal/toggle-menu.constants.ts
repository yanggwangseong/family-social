import { ToggleMenu } from './toggle-modal.interface';
import { BsLink45Deg, BsSend } from 'react-icons/bs';
import { TbDoorExit } from 'react-icons/tb';

export const InviteMenu: ToggleMenu[] = [
	{
		Icon: BsSend,
		title: '이메일로 초대하기',
		description: '사람들에게 이메일 초대를 보냅니다',
	},
	{
		Icon: BsLink45Deg,
		title: '링크로 초대하기',
		description: '링크를 통해서 초대 할 수 있습니다',
	},
];

export const GroupSettingMenu: ToggleMenu[] = [
	{
		Icon: TbDoorExit,
		title: '그룹 삭제',
		description: '관리자만 그룹을 삭제 할 수 있습니다',
	},
];
