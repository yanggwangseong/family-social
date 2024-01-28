import { useState } from 'react';
import { EditMode, Union } from 'types';

export const useEditMode = <T extends Union<typeof EditMode>>(
	defaultEditMode: T,
) => {
	const [isMode, setMode] = useState<T>(defaultEditMode);

	const handleEdit = (mode: T) => {
		setMode(mode);
	};

	return {
		isMode,
		handleEdit,
	};
};
