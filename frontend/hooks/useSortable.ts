import { useEffect, useState } from 'react';
/**
 * @description 리스트를 드래그앤 드롭으로 순서를 변경 하는 훅
 * @template T - 리스트 타입
 * @template U - HTML태그
 * @param {T[]} targetLists 리스트
 * @returns {{
 *   handleDragOver: (e: React.DragEvent) => void,
 *   handleDragStart: (e: React.DragEvent<U>) => void,
 *   handleDragEnd: (e: React.DragEvent) => void,
 *   handleDragEnter: (e: React.DragEvent<U>) => void,
 *   handleDragLeave: (e: React.DragEvent) => void,
 *   handleDrop: (e: React.DragEvent<HTMLLIElement>) => void,
 *   lists: T[],
 * }}
 */
export const useSortable = <T, U extends HTMLElement>(targetLists: T[]) => {
	const [lists, setLists] = useState<T[]>(targetLists);
	const [grab, setGrab] = useState<U | null>(null);

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
	};

	const handleDragStart = (e: React.DragEvent<U>) => {
		setGrab(e.currentTarget);
		e.currentTarget.classList.add('grabbing');
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('text/html', e.currentTarget.innerHTML);
	};

	const handleDragEnd = (e: React.DragEvent) => {
		grab?.classList.remove('grabbing');
		e.dataTransfer.dropEffect = 'move';
		setGrab(null);
	};

	const handleDragEnter = (e: React.DragEvent<U>) => {
		if (grab) {
			const grabPosition = Number(grab.dataset.position);
			const targetPosition = Number(e.currentTarget.dataset.position);

			if (grabPosition < targetPosition) {
				e.currentTarget.classList.add('move_up');
			} else if (grabPosition > targetPosition) {
				e.currentTarget.classList.add('move_down');
			}
		}
	};

	const handleDragLeave = (e: React.DragEvent) => {
		e.currentTarget.classList.remove('move_up');
		e.currentTarget.classList.remove('move_down');
	};

	const handleDrop = (e: React.DragEvent<U>) => {
		const grabPosition = Number(grab?.dataset.position);
		const targetPosition = Number(e.currentTarget.dataset.position);

		if (grab && grabPosition !== undefined) {
			const updatedList = [...lists];
			updatedList[grabPosition] = updatedList.splice(
				targetPosition,
				1,
				updatedList[grabPosition],
			)[0];

			setLists(updatedList);
		}
	};

	useEffect(() => {
		if (targetLists) {
			setLists(targetLists);
		}
	}, [targetLists]);

	return {
		handleDragOver,
		handleDragStart,
		handleDragEnd,
		handleDragEnter,
		handleDragLeave,
		handleDrop,
		lists,
		setLists,
	};
};
