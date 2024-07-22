import { useReducer, useState } from 'react';

export const useToggleState = () => {
	const [isToggle, setIsToggle] = useReducer(state => {
		return !state;
	}, false);

	return {
		isToggle,
		setIsToggle,
	};
};
