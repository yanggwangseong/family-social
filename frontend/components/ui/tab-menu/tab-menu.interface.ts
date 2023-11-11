export interface TabMenuProps {
	list: TabeMenuListType[];
}

export interface TabeMenuListType {
	link: string;
	options: 'TOP' | 'MYFEED' | 'ALL';
}
