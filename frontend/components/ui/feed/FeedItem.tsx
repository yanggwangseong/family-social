import React, { FC, useRef, useState } from 'react';
import styles from './FeedItem.module.scss';
import { BsBoxArrowUp, BsThreeDots } from 'react-icons/bs';
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
	PiChatTextDuotone,
	PiHeartDuotone,
} from 'react-icons/pi';
import GroupAndMemberProfile from '../profile/group-and-member-profile/GroupAndMemberProfile';
import SwiperContainer from '../swiper/SwiperContainer';

const FeedItem: FC<FeedItemProps> = ({
	feed,
	onLike,
	page,
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

	const handleMedias = (medias: MediaInfo[]) => {
		setLayer({
			isShowing: !layer.isShowing,
			medias,
		});
	};

	return (
		<>
			<div>
				<div className={styles.feed_card_container} id={feed.feedId}>
					<div className={styles.feed_card_top_container}>
						{/* <Profile username="양광성"></Profile> */}
						<GroupAndMemberProfile
							username={feed.username}
							groupName={feed.groupName}
						></GroupAndMemberProfile>
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
						onClick={() => handleMedias(feed.medias)}
					>
						{/* media swiper */}
						<SwiperContainer list={feed.medias} />
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
