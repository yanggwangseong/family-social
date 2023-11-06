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
import { Swiper as SwiperCore } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { CgArrowLeft, CgArrowRight } from 'react-icons/cg';

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

	const handleMedias = () => {
		console.log('click');
	};

	const navigationPrevRef = React.useRef(null);
	const navigationNextRef = React.useRef(null);
	const swiperRef = useRef<SwiperCore>();

	return (
		<>
			<div>
				<div className={styles.feed_card_container} id={feed.feedId}>
					<div className={styles.feed_card_top_container}>
						<Profile username="양광성"></Profile>
						<div
							className={styles.feed_card_setting_container}
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
					<div
						className={styles.feed_media_container}
						onClick={e => {
							e.stopPropagation(); // 이벤트 버블링 중지
							handleMedias();
						}}
					>
						<Swiper
							className={styles.feed_media_wrap}
							modules={[Navigation, A11y]}
							spaceBetween={50}
							slidesPerView={1}
							navigation={{
								prevEl: navigationPrevRef.current,
								nextEl: navigationNextRef.current,
							}}
							onBeforeInit={swiper => {
								swiperRef.current = swiper;
							}}
						>
							{feed.medias.map((media, index) => (
								<SwiperSlide key={index} className={styles.swiper_container}>
									<Image
										fill
										src={media.url}
										alt="image"
										style={{ objectFit: 'inherit' }}
									></Image>
									<div
										className={styles.swiper_button_next}
										ref={navigationPrevRef}
										onClick={() => swiperRef.current?.slideNext()}
									>
										<CgArrowRight size={24} />
									</div>
									<div
										className={styles.swiper_button_prev}
										ref={navigationNextRef}
										onClick={() => swiperRef.current?.slidePrev()}
									>
										<CgArrowLeft size={24} />
									</div>
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
