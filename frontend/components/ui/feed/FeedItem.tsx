import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './FeedItem.module.scss';
import Profile from '../profile/Profile';
import Image from 'next/image';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { GoComment } from 'react-icons/go';
import { BsBoxArrowUp, BsThreeDots } from 'react-icons/bs';
import { useModal } from '@/hooks/useModal';
import ToggleModal from '../modal/ToggleModal';
import { FeedSettingMenu } from '../modal/toggle-menu.constants';
import { FeedItemProps } from './feed-item.interface';
import Comments from './comment/Comments';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react'; // basic
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const FeedItem: FC<FeedItemProps> = ({
	feed,
	onLike,
	page,
	onRefetch,
	onLikeComment,
}) => {
	const [isLike, setIsLike] = useState<boolean>(
		feed.myLike ? feed.myLike : false,
	);
	const [isToggleComments, setIsToggleComments] = useState<boolean>(false);
	const [isToggleCommentWrite, setIsToggleCommentWrite] =
		useState<boolean>(false);

	const settingModalWrapperRef = useRef<HTMLDivElement>(null);
	const {
		isShowing: isOpenSetting,
		handleToggleModal: handleCloseSettingModal,
	} = useModal(settingModalWrapperRef);

	const handleLike = () => {
		onLike(feed.feedId, page);
		setIsLike(!isLike);
	};

	const handleToggleComments = () => {
		setIsToggleComments(!isToggleComments);
	};

	const handleToggleCommentWrite = () => {
		if (!isToggleComments) setIsToggleComments(!isToggleComments);

		setIsToggleCommentWrite(true);
	};

	const handleCommentRefetch = () => {
		onRefetch(page);
	};

	const handleLikeComment = (commentId: string) => {
		onLikeComment(feed.feedId, commentId, page);
	};
	console.log(feed.contents);

	return (
		<>
			<div>
				<div className={styles.feed_card_container} id={feed.feedId}>
					<div className={styles.feed_card_top_container}>
						<Profile username="양광성"></Profile>
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
									feedId={feed.feedId}
								/>
							)}
						</div>
					</div>
					<div className={styles.feed_description_container}>
						{feed.contents}
					</div>
					<div className={styles.feed_media_container}>
						<Swiper
							className="w-full h-full relative"
							modules={[Navigation, Pagination, A11y]}
							spaceBetween={50}
							slidesPerView={1}
							navigation
							pagination={{ clickable: true }}
						>
							{feed.medias.map((media, index) => (
								<SwiperSlide key={index}>
									<Image fill src={media.url} alt="image"></Image>
								</SwiperSlide>
							))}
						</Swiper>
						{/* <Image
							fill
							src={'/images/banner/group-base.png'}
							alt="banner"
							priority={false}
						></Image> */}
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

							<div className={styles.like_count}>
								{feed.sumLike ? feed.sumLike : 0}
							</div>
						</div>
						<div
							className={styles.feed_icon_container}
							onClick={handleToggleCommentWrite}
						>
							<GoComment className={styles.feed_icon} size={28} />
						</div>
						<div className={styles.feed_icon_container}>
							<BsBoxArrowUp className={styles.feed_icon} size={28} />
						</div>
						<div
							className={styles.comments_link}
							onClick={() =>
								feed.comments.length === 0 ? undefined : handleToggleComments()
							}
						>
							{feed.comments.length} comments
						</div>
					</div>
				</div>
				{/* 댓글 */}
				{isToggleComments && (
					<Comments
						comments={feed.comments}
						feedId={feed.feedId}
						isToggleCommentWrite={isToggleCommentWrite}
						onCommentRefetch={handleCommentRefetch}
						onLikeComment={handleLikeComment}
					/>
				)}
			</div>
		</>
	);
};

export default FeedItem;
