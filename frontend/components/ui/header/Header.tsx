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
import { useRecoilState } from 'recoil';
import { mainSidebarAtom } from '@/atoms/mainSidebarAtom';
import NotificationModal from '../modal/notification-modal/NotificationModal';
import { BUTTONGESTURE } from '@/utils/animation/gestures';
import { motion } from 'framer-motion';
import { useSearch } from '@/hooks/useSearch';
import { useQuery } from 'react-query';
import { MemberService } from '@/services/member/member.service';
import SearchBox from '../search-box/SearchBox';
import NotFoundSearchMember from '../not-found/search-member/NotFoundSearchMember';

const Header: FC = () => {
	const messageModalWrapperRef = useRef<HTMLDivElement>(null);
	const notificationModalWrapperRef = useRef<HTMLDivElement>(null);

	const {
		isShowing: isOpenMessage,
		handleToggleModal: handleCloseMessageModal,
	} = useModal(messageModalWrapperRef);

	const {
		isShowing: isOpenNotification,
		handleToggleModal: handleCloseNotificationModal,
	} = useModal(notificationModalWrapperRef);

	const [isLeftSidebarShowing, setIsLeftSidebarShowing] =
		useRecoilState(mainSidebarAtom);

	const { handleSearch, debounceSearch } = useSearch();

	const { isSuccess, data } = useQuery(
		['search-chat-members', debounceSearch],
		async () => await MemberService.getMembersByUserName(debounceSearch),
		{
			enabled: !!debounceSearch,
		},
	);

	return (
		<div className={styles.header_container}>
			<div className={styles.header_wrap}>
				<Link href={'/feeds'} className={styles.header_left_container}>
					<motion.div {...BUTTONGESTURE} className={styles.header_logo}>
						FAM
					</motion.div>
					<div className={styles.search_field_wrap}>
						<Field
							style={{ marginLeft: '40px' }}
							fieldClass={'input'}
							onChange={handleSearch}
						></Field>
						{/* [TODO] 검색 결과 폼 컴포넌트 생성하기 */}
						{debounceSearch && (
							<div className={styles.search_lst_container}>
								{data?.length ? (
									data.map((item, index) => <SearchBox key={index} />)
								) : (
									<NotFoundSearchMember />
								)}
							</div>
						)}
					</div>
				</Link>
				<div className={styles.right_icons_container}>
					<motion.div {...BUTTONGESTURE} className={styles.mobile_icon_wrap}>
						<PiMagnifyingGlassDuotone className={styles.icon} size={22} />
					</motion.div>
					<motion.div
						{...BUTTONGESTURE}
						className={styles.mobile_icon_wrap}
						onClick={() => setIsLeftSidebarShowing(!isLeftSidebarShowing)}
					>
						<PiTextOutdentFill className={styles.icon} size={22} />
					</motion.div>
					<motion.div {...BUTTONGESTURE} className={styles.mobile_icon_wrap}>
						<PiTextIndentFill className={styles.icon} size={22} />
					</motion.div>
					<Link className={styles.icon_parent} href={'/feeds'}>
						<motion.div
							{...BUTTONGESTURE}
							className={cn(styles.icon_wrap, styles.mobile_hide_icon)}
						>
							<PiHouseDuotone
								className={styles.icon}
								size={22}
							></PiHouseDuotone>
						</motion.div>
					</Link>
					<motion.div
						className={styles.icon_parent}
						initial={false}
						animate={isOpenNotification ? 'open' : 'closed'}
						ref={notificationModalWrapperRef}
						onClick={handleCloseNotificationModal}
					>
						<motion.div
							{...BUTTONGESTURE}
							className={cn(styles.icon_wrap, {
								[styles.active]: !!isOpenNotification,
							})}
						>
							<PiBellDuotone className={styles.icon} size={22}></PiBellDuotone>
						</motion.div>

						<NotificationModal isOpenNotification={isOpenNotification} />
					</motion.div>
					<motion.div
						className={styles.icon_parent}
						initial={false}
						animate={isOpenMessage ? 'open' : 'closed'}
						ref={messageModalWrapperRef}
						onClick={handleCloseMessageModal}
					>
						<motion.div
							{...BUTTONGESTURE}
							className={cn(styles.icon_wrap, {
								[styles.active]: !!isOpenMessage,
							})}
						>
							<PiMessengerLogoDuotone
								className={styles.icon}
								size={22}
							></PiMessengerLogoDuotone>
						</motion.div>
						<ChatToggleModal isOpenMessage={isOpenMessage} />
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default Header;
