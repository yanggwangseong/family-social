import { useState } from 'react';

export const useSortable = <T>(targetLists: T[]) => {
	const [lists, setLists] = useState<T[]>(targetLists);
	const [grab, setGrab] = useState<HTMLLIElement | null>(null);

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
	};

	const handleDragStart = (e: React.DragEvent<HTMLLIElement>) => {
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

	const handleDragEnter = (e: React.DragEvent<HTMLLIElement>) => {
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

	const handleDrop = (e: React.DragEvent<HTMLLIElement>) => {
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
