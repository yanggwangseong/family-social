import { TabeMenuListType } from './tab-menu.interface';

export const accountTabMenus: TabeMenuListType[] = [
	{
		link: '/accounts',
		options: 'MYFEED',
	},
	{
		link: '/accounts',
		options: 'TOP',
	},
];

export const feedTabMenus: TabeMenuListType[] = [
	{
		link: '/feeds?options=TOP',
		options: 'TOP',
	},
	{
		link: '/feeds?options=MYFEED',
		options: 'MYFEED',
	},
	{
		link: '/feeds?options=ALL',
		options: 'ALL',
	},
];
