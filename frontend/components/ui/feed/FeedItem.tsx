import React, { FC, useRef, useState } from 'react';
import styles from './FeedItem.module.scss';
import { BsThreeDots } from 'react-icons/bs';
import { useModal } from '@/hooks/useModal';
import ToggleModal from '../modal/ToggleModal';
import { FeedSettingMenu } from '../modal/toggle-menu.constants';
import { FeedItemProps } from './feed-item.interface';
import Comments from './comment/Comments';

import { useRecoilState } from 'recoil';
import {
	mediasLayerModalAtom,
	mediasLayerModalAtomType,
} from '@/atoms/mediasLayerModalAtom';
import { MediaInfo } from '@/shared/interfaces/media.interface';
import {
	PiArrowSquareOutDuotone,
	PiChatDuotone,
	PiHeartDuotone,
	PiLockKeyDuotone,
} from 'react-icons/pi';
import GroupAndMemberProfile from '../profile/group-and-member-profile/GroupAndMemberProfile';
import SwiperContainer from '../swiper/SwiperContainer';
import { motion } from 'framer-motion';
import { easeOutAnimation } from '@/utils/animation/ease-out';
import MentionView from '../mention/mention-view/MentionView';

const FeedItem: FC<FeedItemProps> = ({
	feed,
	onLike,
	page,
	index,
	onRefetch,
	onLikeComment,
}) => {
	const [layer, setLayer] =
		useRecoilState<mediasLayerModalAtomType>(mediasLayerModalAtom);

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
		onLike(feed.feedId, page, feed.memberId);
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

	const handleMedias = (medias: MediaInfo[]) => {
		setLayer({
			isShowing: !layer.isShowing,
			medias,
		});
	};

	return (
		<>
			<motion.div {...easeOutAnimation(index)}>
				<div className={styles.feed_card_container} id={feed.feedId}>
					<div className={styles.feed_card_top_container}>
						{/* <Profile username="양광성"></Profile> */}
						<GroupAndMemberProfile
							username={feed.username}
							groupName={feed.groupName}
						></GroupAndMemberProfile>

						<div className={styles.feed_right_top_container}>
							{!feed.isPublic && (
								<div>
									<PiLockKeyDuotone size={24} />
								</div>
							)}
							<motion.div
								className={styles.feed_card_setting_container}
								initial={false}
								animate={isOpenSetting ? 'open' : 'closed'}
								ref={settingModalWrapperRef}
							>
								<BsThreeDots size={24} onClick={handleCloseSettingModal} />

								<ToggleModal
									list={FeedSettingMenu}
									onClose={handleCloseSettingModal}
									direction="right"
									feedId={feed.feedId}
								/>
							</motion.div>
						</div>
					</div>
					<div className={styles.feed_description_container}>
						{
							<MentionView
								contents={feed.contents}
								mentions={feed.mentions}
							></MentionView>
						}
					</div>
					<div
						className={styles.feed_media_container}
						onClick={() => handleMedias(feed.medias)}
					>
						{/* media swiper */}
						<SwiperContainer
							type="feed-item"
							list={feed.medias}
							overrideSwiperOptions={{
								spaceBetween: 50,
							}}
						/>
					</div>
					<div className={styles.feed_bottom_container}>
						<div className={styles.like_container}>
							{isLike ? (
								<PiHeartDuotone
									size={28}
									color="#FB1F42"
									className={styles.like_icon}
									onClick={handleLike}
								/>
							) : (
								<PiHeartDuotone
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
							<PiChatDuotone className={styles.feed_icon} size={28} />
						</div>
						<div className={styles.feed_icon_container}>
							<PiArrowSquareOutDuotone className={styles.feed_icon} size={28} />
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
						feedWriterId={feed.memberId}
						isToggleCommentWrite={isToggleCommentWrite}
						onCommentRefetch={handleCommentRefetch}
						onLikeComment={handleLikeComment}
					/>
				)}
			</motion.div>
		</>
	);
};

export default FeedItem;
