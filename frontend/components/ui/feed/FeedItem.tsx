import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './FeedItem.module.scss';
import Profile from '../profile/Profile';
import Image from 'next/image';
import Lottie from 'lottie-react';
import heartAnimation from '@/assets/lottie/like.json';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import Link from 'next/link';
import { BsThreeDots } from 'react-icons/bs';
import { useModal } from '@/hooks/useModal';
import ToggleModal from '../modal/ToggleModal';
import { FeedSettingMenu } from '../modal/toggle-menu.constants';

const FeedItem: FC<{ id: string }> = ({ id }) => {
	const comments = 3;

	const [isLike, setIsLike] = useState<boolean>(false);
	const [isLottie, setIsLottie] = useState<boolean>(false);

	const settingModalWrapperRef = useRef<HTMLDivElement>(null);
	const {
		isShowing: isOpenSetting,
		handleToggleModal: handleCloseSettingModal,
	} = useModal(settingModalWrapperRef);

	const handleLike = () => {
		setIsLike(true);
		setIsLottie(true);
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLottie(false);
		}, 1300);

		return () => {
			clearTimeout(timer);
		};
	}, [isLottie]);

	return (
		<div className={styles.feed_card_container} id={id}>
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
					{isLike ? (
						<AiFillHeart
							size={28}
							color="#FB1F42"
							className={styles.like_icon}
						/>
					) : (
						<AiOutlineHeart
							size={28}
							className={styles.like_icon}
							onClick={handleLike}
						/>
					)}

					<div className={styles.like_count}>17</div>
				</div>
				{isLottie && (
					<div className={styles.modal_mask}>
						<div className={styles.lottie_container}>
							<Lottie animationData={heartAnimation} loop={false} />
						</div>
					</div>
				)}
				<div className={styles.comments_link}>{comments} comments</div>
			</div>
		</div>
	);
};

export default FeedItem;
