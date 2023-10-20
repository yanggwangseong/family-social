import { IconType } from 'react-icons';
import { LayerMode, ToggleModalDerection, Union } from 'types';

export interface ToggleModalProps {
	list: ToggleMenu[];
	onClose: () => void;
	direction?: Union<typeof ToggleModalDerection>;
}

export interface ToggleMenu {
	Icon: IconType;
	title: string;
	description: string;
	layer: Union<typeof LayerMode>;
	onClose?: () => void;
}
