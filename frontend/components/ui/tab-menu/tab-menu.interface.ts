import { TabMenus, Union } from 'types';

export interface TabMenuProps {
	list: TabeMenuListType[];
}

export interface TabeMenuListType {
	link: string;
	options: Union<typeof TabMenus>;
	title: string;
}
