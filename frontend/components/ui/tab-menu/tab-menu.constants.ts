import { TabeMenuListType } from './tab-menu.interface';

export const tourismTabMenus: TabeMenuListType[] = [
	{
		link: '/schedules/create?menu=TOURCONTENTTYPE',
		options: 'TOURCONTENTTYPE',
		title: '관광 타입',
	},
	{
		link: '/schedules/create?menu=FESTIVAL',
		options: 'FESTIVAL',
		title: '행사/축제',
	},
	{
		link: '/schedules/create?menu=TOURSEARCH',
		options: 'TOURSEARCH',
		title: '키워드 검색',
	},
];

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
	{
		link: '/schedules',
		options: 'SHAREDSCHEDULE',
		title: '공유된 일정',
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

export const notificationsTabMenus: TabeMenuListType[] = [
	{
		link: '/notifications?options=ALL',
		options: 'ALL',
		title: '전체',
	},
	{
		link: '/notifications?options=READ',
		options: 'READ',
		title: '읽음',
	},
	{
		link: '/notifications?options=NOTREAD',
		options: 'NOTREAD',
		title: '안읽음',
	},
];
