import React, { FC, useRef } from 'react';
import styles from './Header.module.scss';
import Field from '../field/Field';
import Link from 'next/link';
import {
	PiBellDuotone,
	PiHouseDuotone,
	PiMessengerLogoDuotone,
	PiMagnifyingGlassDuotone,
	PiTextOutdentFill,
	PiTextIndentFill,
} from 'react-icons/pi';
import { useModal } from '@/hooks/useModal';
import cn from 'classnames';
import ChatToggleModal from '../modal/chat-toggle-modal/ChatToggleModal';

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
					<div className={styles.search_field_wrap}>
						<Field style={{ marginLeft: '40px' }} fieldClass={'input'}></Field>
					</div>
				</div>
				<div className={styles.right_icons_container}>
					<div className={styles.mobile_icon_wrap}>
						<PiMagnifyingGlassDuotone className={styles.icon} size={22} />
					</div>
					<div className={styles.mobile_icon_wrap}>
						<PiTextOutdentFill className={styles.icon} size={22} />
					</div>
					<div className={styles.mobile_icon_wrap}>
						<PiTextIndentFill className={styles.icon} size={22} />
					</div>
					<Link href={'/feeds'}>
						<div className={styles.icon_wrap}>
							<PiHouseDuotone
								className={styles.icon}
								size={22}
							></PiHouseDuotone>
						</div>
					</Link>
					<div className={styles.icon_wrap}>
						<PiBellDuotone className={styles.icon} size={22}></PiBellDuotone>
					</div>
					<div
						className={cn(styles.icon_wrap, {
							[styles.active]: !!isOpenMessage,
						})}
						ref={messageModalWrapperRef}
						onClick={handleCloseMessageModal}
					>
						<PiMessengerLogoDuotone
							className={styles.icon}
							size={22}
						></PiMessengerLogoDuotone>
						{isOpenMessage && <ChatToggleModal></ChatToggleModal>}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
