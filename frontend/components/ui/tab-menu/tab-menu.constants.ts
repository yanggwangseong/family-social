import { TabeMenuListType } from './tab-menu.interface';

export const scheduleTabMenus: TabeMenuListType[] = [
	{
		link: '/schedules',
		options: 'SCHEDULEALL',
		title: '전체 일정',
	},
	{
		link: '/schedules',
		options: 'MYSCHEDULE',
		title: '나의 일정',
	},
];

export const accountTabMenus: TabeMenuListType[] = [
	{
		link: '/accounts',
		options: 'MYFEED',
		title: 'MYFEED',
	},
	{
		link: '/accounts',
		options: 'TOP',
		title: 'TOP',
	},
];

export const feedTabMenus: TabeMenuListType[] = [
	{
		link: '/feeds?options=TOP',
		options: 'TOP',
		title: 'TOP',
	},
	{
		link: '/feeds?options=MYFEED',
		options: 'MYFEED',
		title: 'MYFEED',
	},
	{
		link: '/feeds?options=ALL',
		options: 'ALL',
		title: 'ALL',
	},
];
