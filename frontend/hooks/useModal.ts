import { useState } from 'react';

export const useModal = () => {
	const [isShowing, setIsShowing] = useState<boolean>(false);

	const handleToggleModal = () => {
		setIsShowing(!isShowing);
	};

	return {
		isShowing,
		handleToggleModal,
	};
};
