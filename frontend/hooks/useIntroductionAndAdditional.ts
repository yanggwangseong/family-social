import { useReducer, useState } from 'react';

export const useIntroductionAndAdditional = () => {
	const [isIntroduction, setIsIntroduction] = useReducer(state => {
		return !state;
	}, false);

	const [isAdditional, setIsAdditional] = useReducer(state => {
		return !state;
	}, false);

	return {
		isIntroduction,
		setIsIntroduction,
		isAdditional,
		setIsAdditional,
	};
};
