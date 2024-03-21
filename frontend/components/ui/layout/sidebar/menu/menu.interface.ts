import { IconType } from 'react-icons';

export interface MenuProps {
	link: string;
	Icon: IconType;
	menu: string;
	handleCloseMainSidebar: () => void;
}
