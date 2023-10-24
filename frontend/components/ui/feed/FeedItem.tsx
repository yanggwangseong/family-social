import React, { FC, useRef, useState } from 'react';
import styles from './FeedItem.module.scss';
import Profile from '../profile/Profile';
import Image from 'next/image';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { useModal } from '@/hooks/useModal';
import ToggleModal from '../modal/ToggleModal';
import { FeedSettingMenu } from '../modal/toggle-menu.constants';
import { FeedItemProps } from './feed-item.interface';
import { useQueryClient } from 'react-query';

const FeedItem: FC<FeedItemProps> = ({
	id,
	onLike,
	myLike,
	sumLike = 0,
	page,
}) => {
	const comments = 3;

	const [isLike, setIsLike] = useState<boolean>(myLike ? myLike : false);
	const settingModalWrapperRef = useRef<HTMLDivElement>(null);
	const {
		isShowing: isOpenSetting,
		handleToggleModal: handleCloseSettingModal,
	} = useModal(settingModalWrapperRef);

	const handleLike = () => {
		onLike(id, page);
		setIsLike(!isLike);
	};

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
							direction="right"
							feedId={id}
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
							onClick={handleLike}
						/>
					) : (
						<AiOutlineHeart
							size={28}
							className={styles.like_icon}
							onClick={handleLike}
						/>
					)}

					<div className={styles.like_count}>{sumLike}</div>
				</div>

				<div className={styles.comments_link}>{comments} comments</div>
			</div>
		</div>
	);
};

export default FeedItem;
