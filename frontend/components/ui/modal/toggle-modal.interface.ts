import { IconType } from 'react-icons';

export interface ToggleModalProps {
	list: ToggleMenu[];
	onClose: () => void;
}

export interface ToggleMenu {
	Icon: IconType;
	title: string;
	description: string;
	onClose?: () => void;
}
