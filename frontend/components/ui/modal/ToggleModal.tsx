import React, { FC, useEffect, useRef } from 'react';
import styles from './ToggleModal.module.scss';
import ToggleModalItem from './toggle-modal-item/ToggleModalItem';
import { ToggleModalProps } from './toggle-modal.interface';

const ToggleModal: FC<ToggleModalProps> = ({
	list,
	onClose,
	modalWrapperRef,
}) => {
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// 바깥 영역 클릭 시 모달 닫기
		const handleClickOutside = (e: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(e.target as Node) &&
				modalWrapperRef.current &&
				!modalWrapperRef.current.contains(e.target as Node)
			) {
				onClose(); // onClose 콜백 호출하여 모달 닫기
			}
		};

		// 이벤트 리스너 등록
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			// 컴포넌트가 언마운트될 때 이벤트 리스너 해제
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [onClose]);

	return (
		<div className={styles.toggle_modal_container} ref={modalRef}>
			{/* menu */}
			{list.map((item, index) => (
				<ToggleModalItem
					key={index}
					Icon={item.Icon}
					title={item.title}
					description={item.description}
					onClose={onClose}
				/>
			))}
		</div>
	);
};

export default ToggleModal;
