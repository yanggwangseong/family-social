import { AiOutlineDelete } from 'react-icons/ai';
import { ToggleMenu } from './toggle-modal.interface';
import { BsPencil } from 'react-icons/bs';
import { LayerMode } from 'types';
import {
	PiDoorDuotone,
	PiPaperclipDuotone,
	PiPaperPlaneTiltDuotone,
	PiTrashDuotone,
	PiPencilDuotone,
} from 'react-icons/pi';

export const InviteMenu: ToggleMenu[] = [
	{
		Icon: PiPaperPlaneTiltDuotone,
		title: '이메일로 초대하기',
		description: '사람들에게 이메일 초대를 보냅니다',
		layer: LayerMode.emailInvite,
	},
	{
		Icon: PiPaperclipDuotone,
		title: '링크로 초대하기',
		description: '링크를 통해서 초대 할 수 있습니다',
		layer: LayerMode.linkInvite,
	},
];

export const GroupSettingMenu: ToggleMenu[] = [
	{
		Icon: PiDoorDuotone,
		title: '그룹 삭제',
		description: '관리자만 그룹을 삭제 할 수 있습니다',
		layer: LayerMode.groupDeleteConfirm,
	},
];

export const FeedSettingMenu: ToggleMenu[] = [
	{
		Icon: PiTrashDuotone,
		title: '피드 삭제',
		description:
			'피드 작성자 또는 그룹 관리자만 해당 피드를 삭제 할 수 있습니다',
		layer: LayerMode.feedDeleteConfirm,
	},
	{
		Icon: PiPencilDuotone,
		title: '피드 수정',
		description: '피드를 수정 합니다',
		layer: LayerMode.createFeed,
	},
];

export const ScheduleSettingMenu: ToggleMenu[] = [
	{
		Icon: AiOutlineDelete,
		title: '여행일정 삭제',
		description: '해당 여행 일정을 삭제 할 수 있습니다.',
		layer: LayerMode.scheduleDeleteConfirm,
	},
];
