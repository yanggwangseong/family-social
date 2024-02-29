import React, { FC, useRef } from 'react';
import styles from './Header.module.scss';
import Field from '../field/Field';
import Link from 'next/link';
import { FaRegBell } from 'react-icons/fa';
import { AiOutlineHome, AiOutlineMessage } from 'react-icons/ai';
import { useModal } from '@/hooks/useModal';

const Header: FC = () => {
	const messageModalWrapperRef = useRef<HTMLDivElement>(null);
	const {
		isShowing: isOpenMessage,
		handleToggleModal: handleCloseMessageModal,
	} = useModal(messageModalWrapperRef);

	return (
		<div className={styles.header_container}>
			<div className={styles.header_wrap}>
				<div className={styles.header_left_container}>
					<div className={styles.header_logo}>FAM</div>
					<Field style={{ marginLeft: '40px' }} fieldClass={'input'}></Field>
				</div>
				<div className={styles.right_icons_container}>
					<Link href={'/feeds'}>
						<div className={styles.icon_wrap}>
							<AiOutlineHome size={22}></AiOutlineHome>
						</div>
					</Link>
					<div className={styles.icon_wrap}>
						<FaRegBell size={22}></FaRegBell>
					</div>
					<div
						className={styles.icon_wrap}
						ref={messageModalWrapperRef}
						onClick={handleCloseMessageModal}
					>
						<AiOutlineMessage size={22}></AiOutlineMessage>
						{isOpenMessage && (
							<div
								className="absolute top-14 right-0 border
								border-solid border-customDark bg-white w-[360px] p-4
								shadow-2xl z-50"
							>
								message
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
