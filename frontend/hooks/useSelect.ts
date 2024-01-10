import { useState } from 'react';
import { SelectOptions, Union } from 'types';

export const useSelect = <T>(defaultSelected: T) => {
	const [isSelected, setIsSelected] = useState<T>(defaultSelected);
	const [isToggle, setIsToggle] = useState<boolean>(false);

	const handleSelectToggle = () => {
		setIsToggle(!isToggle);
	};

	const handleChageSelected = (status: T) => {
		setIsSelected(status);
		handleSelectToggle();
	};

	return {
		handleChageSelected,
		handleSelectToggle,
		isToggle,
		isSelected,
	};
};
