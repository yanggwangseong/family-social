import React, { FC, useRef } from 'react';
import styles from './FeedItem.module.scss';
import Profile from '../profile/Profile';
import Image from 'next/image';
import Lottie from 'lottie-react';
import heartAnimation from '@/assets/lottie/like.json';
import { AiOutlineHeart } from 'react-icons/ai';
import Link from 'next/link';
import { BsThreeDots } from 'react-icons/bs';
import { useModal } from '@/hooks/useModal';
import ToggleModal from '../modal/ToggleModal';
import { FeedSettingMenu } from '../modal/toggle-menu.constants';

const FeedItem: FC = () => {
	const comments = 3;

	const settingModalWrapperRef = useRef<HTMLDivElement>(null);
	const {
		isShowing: isOpenSetting,
		handleToggleModal: handleCloseSettingModal,
	} = useModal(settingModalWrapperRef);

	return (
		<div className={styles.feed_card_container}>
			<div className={styles.feed_card_top_container}>
				<Profile></Profile>
				<div
					className="ml-auto cursor-pointer relative"
					ref={settingModalWrapperRef}
				>
					<BsThreeDots size={24} onClick={handleCloseSettingModal} />
					{isOpenSetting && (
						<ToggleModal
							list={FeedSettingMenu}
							onClose={handleCloseSettingModal}
						/>
					)}
				</div>
			</div>
			<div className={styles.feed_description_container}>
				엄마 아빠 수진이와 함께 캠핑을 갔습니다!
			</div>
			<div className={styles.feed_media_container}>
				<Image
					fill
					src={'/images/banner/group-base.png'}
					alt="banner"
					priority={false}
				></Image>
			</div>
			<div className={styles.feed_bottom_container}>
				<div className={styles.like_container}>
					<AiOutlineHeart size={28} />
					<div className={styles.like_count}>17</div>
				</div>
				{/* <div className={styles.lottie_container}>
					<Lottie animationData={heartAnimation} loop={false} />
				</div> */}
				<Link className={styles.comments_link} href={'#'}>
					{comments} comments
				</Link>
			</div>
		</div>
	);
};

export default FeedItem;
