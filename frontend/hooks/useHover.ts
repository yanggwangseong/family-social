import { useState } from 'react';

export const useHover = () => {
	const [isHovering, setIsHovering] = useState<number | null>(null);

	const handleMouseOver = (index: number) => {
		setIsHovering(index);
	};

	const handleMouseOut = () => {
		setIsHovering(null);
	};

	return {
		handleMouseOver,
		handleMouseOut,
		isHovering,
	};
};
