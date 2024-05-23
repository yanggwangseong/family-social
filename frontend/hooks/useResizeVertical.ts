import { useCallback, useEffect, useRef, useState } from 'react';
import { useIsMobile } from './useIsMobile';

export const useResizeVertical = (
	maxMinusHeight: number,
	minHeight: number,
) => {
	const sidebarRef = useRef<HTMLDivElement>(null);
	const [isResizing, setIsResizing] = useState(false);

	const { isMobile } = useIsMobile();

	const handleMouseDown = () => {
		setIsResizing(true);
	};

	const handleMouseUp = useCallback(() => {
		setIsResizing(false);
	}, []);

	const handleTouchStart = () => {
		setIsResizing(true);
	};

	const handleTouchEnd = useCallback(() => {
		setIsResizing(false);
	}, []);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const handleMouseMove = (e: MouseEvent) => {
				if (!isResizing || !sidebarRef.current) return;
				let newHeight = window.innerHeight - e.clientY;
				const maxSidebarHeight = window.innerHeight - maxMinusHeight;
				const minSidebarHeight = minHeight;

				if (newHeight > maxSidebarHeight) {
					newHeight = maxSidebarHeight;
				}

				if (newHeight < minSidebarHeight) {
					newHeight = minSidebarHeight;
				}
				sidebarRef.current.style.height = `${newHeight}px`;
			};

			const handleTouchMove = (e: TouchEvent) => {
				if (!isResizing || !sidebarRef.current) return;
				const touch = e.touches[0];
				let newHeight = window.innerHeight - touch.clientY;

				const maxSidebarHeight = window.innerHeight - maxMinusHeight;
				const minSidebarHeight = minHeight;

				if (newHeight > maxSidebarHeight) {
					newHeight = maxSidebarHeight;
				}

				if (newHeight < minSidebarHeight) {
					newHeight = minSidebarHeight;
				}

				sidebarRef.current.style.height = `${newHeight}px`;
			};

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
		}
	}, [isResizing, handleMouseUp, handleTouchEnd, minHeight, maxMinusHeight]);

	useEffect(() => {
		if (!isMobile && sidebarRef.current) {
			sidebarRef.current.style.height = `100%`;
		} else {
			if (sidebarRef.current) {
				sidebarRef.current.style.height = `calc(100vh - 30vh - 80px)`;
			}
		}
	}, [isMobile, sidebarRef]);

	return {
		handleTouchStart,
		handleMouseDown,
		sidebarRef,
	};
};
