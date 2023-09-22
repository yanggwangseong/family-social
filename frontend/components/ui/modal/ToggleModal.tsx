import React, { FC } from 'react';
import styles from './ToggleModal.module.scss';
import { BsLink45Deg, BsTelephonePlus } from 'react-icons/bs';
import ToggleModalItem from './toggle-modal-item/ToggleModalItem';

const ToggleModal: FC = () => {
	return (
		<div className={styles.toggle_modal_container}>
			{/* menu */}
			<ToggleModalItem
				Icon={BsTelephonePlus}
				title={'전화번호로 초대하기'}
				description={'전화번호 통해서 검색하여 초대를 보냅니다'}
			/>
			<ToggleModalItem
				Icon={BsLink45Deg}
				title={'링크로 초대하기'}
				description={'링크를 통해서 초대 할 수 있습니다'}
			/>
		</div>
	);
};

export default ToggleModal;
