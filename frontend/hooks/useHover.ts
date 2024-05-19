import { useState } from 'react';

export const useHover = () => {
	const [isHovering, setIsHovering] = useState<number>();

	const handleMouseOver = (index: number) => {
		setIsHovering(index);
	};

	const handleMouseOut = (index: number) => {
		setIsHovering(undefined);
	};

	return {
		handleMouseOver,
		handleMouseOut,
		isHovering,
	};
};
