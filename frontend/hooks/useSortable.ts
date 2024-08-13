import { useEffect, useState } from 'react';
/**
 * @description 리스트를 드래그앤 드롭으로 순서를 변경 하는 훅
 * @template T - 리스트 타입
 * @template U - HTML태그
 * @param {T[]} targetLists 리스트
 * @returns {
 *   handleDragOver: (e: React.DragEvent) => void,
 *   handleDragStart: (e: React.DragEvent<U>) => void,
 *   handleDragEnd: (e: React.DragEvent) => void,
 *   handleDragEnter: (e: React.DragEvent<U>) => void,
 *   handleDragLeave: (e: React.DragEvent) => void,
 *   handleDrop: (e: React.DragEvent<HTMLLIElement>) => void,
 *   lists: T[],
 * }
 */
export const useSortable = <T, U extends HTMLElement>(
	lists: T[],
	handleSetList: (grap: T, target: T, lists: T[]) => void,
) => {
	const [grab, setGrab] = useState<U | null>(null);

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
	};

	const handleDragStart = (e: React.DragEvent<U>) => {
		setGrab(e.currentTarget);
		e.currentTarget.classList.add('grabbing');
		e.dataTransfer.effectAllowed = 'move';
	};

	const handleDragEnd = (e: React.DragEvent) => {
		grab?.classList.remove('grabbing');
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

		if (grab && grabPosition !== undefined && targetPosition !== undefined) {
			const updatedList = [...lists];
			[updatedList[grabPosition], updatedList[targetPosition]] = [
				updatedList[targetPosition],
				updatedList[grabPosition],
			];

			handleSetList(
				updatedList[grabPosition],
				updatedList[targetPosition],
				updatedList,
			);
		}
	};

	return {
		handleDragOver,
		handleDragStart,
		handleDragEnd,
		handleDragEnter,
		handleDragLeave,
		handleDrop,
		lists,
	};
};
