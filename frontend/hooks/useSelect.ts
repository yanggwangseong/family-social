import { useState } from 'react';

export const useSelect = <T extends string>(defaultSelected: T) => {
	const [isSelected, setIsSelected] = useState<T>(defaultSelected);
	const [isToggle, setIsToggle] = useState<boolean>(false);

	const handleSelectToggle = () => {
		setIsToggle(!isToggle);
	};

	const handleChangeSelected = (status: T) => {
		setIsSelected(status);
		handleSelectToggle();
	};

	return {
		handleChangeSelected,
		handleSelectToggle,
		isToggle,
		isSelected,
	};
};
