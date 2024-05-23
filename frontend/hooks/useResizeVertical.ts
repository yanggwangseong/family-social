import { useCallback, useEffect, useRef, useState } from 'react';

export const useResizeVertical = (
	maxSidebarHeight: number,
	minSidebarHeight: number,
) => {
	const sidebarRef = useRef<HTMLDivElement>(null);
	const [isResizing, setIsResizing] = useState(false);

	const handleMouseDown = () => {
		setIsResizing(true);
	};

	const handleMouseMove = useCallback(
		(e: MouseEvent) => {
			if (!isResizing || !sidebarRef.current) return;
			let newHeight = window.innerHeight - e.clientY;
			if (newHeight > maxSidebarHeight) {
				newHeight = maxSidebarHeight;
			}

			if (newHeight < minSidebarHeight) {
				newHeight = minSidebarHeight;
			}
			sidebarRef.current.style.height = `${newHeight}px`;
		},
		[isResizing, maxSidebarHeight, minSidebarHeight],
	);

	const handleMouseUp = () => {
		setIsResizing(false);
	};

	const handleTouchStart = () => {
		setIsResizing(true);
	};

	const handleTouchMove = useCallback(
		(e: TouchEvent) => {
			if (!isResizing || !sidebarRef.current) return;
			const touch = e.touches[0];
			let newHeight = window.innerHeight - touch.clientY;
			if (newHeight > maxSidebarHeight) {
				newHeight = maxSidebarHeight;
			}

			if (newHeight < minSidebarHeight) {
				newHeight = minSidebarHeight;
			}
			sidebarRef.current.style.height = `${newHeight}px`;
		},
		[isResizing, maxSidebarHeight, minSidebarHeight],
	);

	const handleTouchEnd = () => {
		setIsResizing(false);
	};

	useEffect(() => {
		if (isResizing) {
			document.addEventListener('mousemove', handleMouseMove);
			document.addEventListener('mouseup', handleMouseUp);
			document.addEventListener('touchmove', handleTouchMove);
			document.addEventListener('touchend', handleTouchEnd);
		} else {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
			document.removeEventListener('touchmove', handleTouchMove);
			document.removeEventListener('touchend', handleTouchEnd);
		}

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
			document.removeEventListener('touchmove', handleTouchMove);
			document.removeEventListener('touchend', handleTouchEnd);
		};
	}, [handleMouseMove, handleTouchMove, isResizing]);

	return {
		handleTouchStart,
		handleMouseDown,
		sidebarRef,
	};
};
