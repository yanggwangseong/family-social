import { IconType } from 'react-icons';
import { LayerMode, Union } from 'types';

export interface ToggleModalProps {
	list: ToggleMenu[];
	onClose: () => void;
}

export interface ToggleMenu {
	Icon: IconType;
	title: string;
	description: string;
	layer: Union<typeof LayerMode>;
	onClose?: () => void;
}
