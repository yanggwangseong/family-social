import { IconType } from 'react-icons';

export interface ToggleModalProps {
	list: ToggleMenu[];
}

export interface ToggleMenu {
	Icon: IconType;
	title: string;
	description: string;
}
