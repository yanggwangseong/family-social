import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import GroupProfile from '@/components/ui/profile/group-profile/GroupProfile';
import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import styles from './CreateFeed.module.scss';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { GroupService } from '@/services/group/group.service';
import Image from 'next/image';
import Skeleton from '@/components/ui/skeleton/Skeleton';
import FieldWithTextarea from '@/components/ui/field/field-area/FieldArea';
import Profile from '@/components/ui/profile/Profile';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react'; // basic
import { Swiper as SwiperCore } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
	CreateFeedFields,
	CreateFeedRequest,
	CreateMediaType,
	UpdateFeedRequest,
} from './create-feed.interface';
import { MediaService } from '@/services/media/media.service';
import axios from 'axios';
import { FeedService } from '@/services/feed/feed.service';
import { useRecoilState } from 'recoil';
import { modalAtom } from '@/atoms/modalAtom';
import { feedIdAtom } from '@/atoms/feedIdAtom';
import { useEmoji } from '@/hooks/useEmoji';
import { FaRegSmile } from 'react-icons/fa';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import Line from '@/components/ui/line/Line';
import { AiOutlineClose } from 'react-icons/ai';
import { Union, feedPublicSelectOptions } from 'types';
import { CgArrowLeft, CgArrowRight } from 'react-icons/cg';
import { useMemberBelongToGroups } from '@/hooks/useMemberBelongToGroups';

const CreateFeed: FC = () => {
	const [isFeedId, setIsFeedId] = useRecoilState(feedIdAtom);

	const [, setIsShowing] = useRecoilState<boolean>(modalAtom);

	const [isFeedPage, setIsFeedPage] = useState('selectGroup');

	const [isFiles, setIsFiles] = useState<File[]>([]);
	const [isImageUrl, setIsImageUrl] = useState<string[]>([]);

	const [isUplaod, setIsUpload] = useState<boolean>(false);

	const { data, isLoading, handleSelectedGroup, isSelecteGroup } =
		useMemberBelongToGroups();

	const {
		data: feed,
		isLoading: feddLoading,
		remove,
	} = useQuery(
		['get-feed-by-id'],
		async () => await FeedService.getFeedById(isFeedId),
		{
			enabled: !!isFeedId, // isFeedId가 true일 때만 쿼리 활성화
		},
	);

	const [isPublic, setIsPublic] = useState<
		Union<typeof feedPublicSelectOptions>
	>(
		feed?.isPublic ? (feed.isPublic === true ? 'public' : 'private') : 'public',
	);

	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
		reset,
		getValues,
		setValue,
		watch,
	} = useForm<CreateFeedFields>({
		mode: 'onChange',
	});

	const { isEmoji, handleEmojiView, handlesetValueAddEmoji } =
		useEmoji<CreateFeedFields>(getValues, setValue);

	const { mutateAsync: uploadFilesASync } = useMutation(
		['upload-file'],
		async () => await MediaService.uploadfile(isFiles),
		{
			onMutate: variable => {},
			onSuccess(data: string[]) {},
			onError(error) {
				if (axios.isAxiosError(error)) {
					Report.warning('실패', `${error.response?.data.message}`, '확인');
				}
			},
		},
	);

	const { mutateAsync: createFeedASync } = useMutation(
		['create-feed'],
		async (data: CreateFeedRequest) => await FeedService.createFeed(data),
		{
			onMutate: variable => {
				Loading.hourglass();
			},
			onSuccess(data) {
				Loading.remove();
				Report.success('성공', `피드가 생성 되었습니다`, '확인', () => {
					setIsShowing(false);
				});
			},
			onError(error) {
				if (axios.isAxiosError(error)) {
					Report.warning('실패', `${error.response?.data.message}`, '확인');
				}
			},
		},
	);

	const { mutateAsync: updateFeedASync } = useMutation(
		['update-feed'],
		async (data: UpdateFeedRequest) => await FeedService.updateFeed(data),
		{
			onMutate: variable => {
				Loading.hourglass();
			},
			onSuccess(data) {
				Loading.remove();
				Report.success('성공', `피드가 수정 되었습니다`, '확인', () => {
					setIsShowing(false);
				});
			},
			onError(error) {
				if (axios.isAxiosError(error)) {
					Report.warning('실패', `${error.response?.data.message}`, '확인');
				}
			},
		},
	);

	const handleAddEmojiValue = (emojiData: EmojiClickData) => {
		handlesetValueAddEmoji(emojiData, 'contents');
	};

	const createMedia = (url: string, position: number) => {
		return {
			url: url,
			position: position,
		};
	};

	const resetImageUrl = () => {
		setIsImageUrl([]);
	};

	const handleAddDocuments = async (event: ChangeEvent<HTMLInputElement>) => {
		const uploadedFiles: File[] = Array.from(event.target.files || []);
		// const blobArrayImage: string[] = uploadedFiles.map(file =>
		// 	URL.createObjectURL(file),
		// );
		// resetImageUrl(); // 배열을 초기화 해준다.
		// setIsImageUrl(blobArrayImage);
		setIsFiles(uploadedFiles);
		setIsUpload(true);
		//const result = await AuthService.uploadfile(uploadedFiles);
		//console.log(result);
		// const files = uploadedFiles.map(file => ({
		// 	file,
		// }));
	};
	const handleExcludeMedia = (key: number) => {
		setIsFiles(isFiles.filter((file, index) => index !== key));
	};

	useEffect(() => {
		if (isFiles) {
			const blobArrayImage: string[] = isFiles.map(file =>
				URL.createObjectURL(file),
			);
			//console.log(isImageUrl); // useEffect가 이전에 있던 놈들을 URL.revokeObjectURL 해주는데 url이 filter로 새로 만들어진 url과 같아서 계속 revoke됨
			setIsImageUrl(blobArrayImage);
		}
	}, [isFiles]);

	useEffect(() => {
		return () => {
			// 컴포넌트가 언마운트될 때 URL을 제거
			if (isImageUrl) {
				isImageUrl.map(url => {
					console.log('호출!!!', url);
					URL.revokeObjectURL(url);
				});
			}
		};
	}, [isImageUrl]);

	useEffect(() => {
		if (!isFeedId) remove();
		if (feed && !isLoading && isFeedId) handleSelectedGroup(feed.groupId);
	}, [feed]);

	// [TODO] 1. 그룹을 먼저 선택한다. (O)
	// [TODO] 2. 이미지 또는 미디어를 올린다.
	// [TODO] 3. 피드 공개/비공개 선택 셀렉트박스 추가 피드 글 내용 작성.

	const handleChangePage = (page: string) => {
		setIsFeedPage(page);
	};

	const handleChageIsPublic = (
		status: Union<typeof feedPublicSelectOptions>,
	) => {
		setIsPublic(status);
	};

	const onSubmit: SubmitHandler<CreateFeedFields> = async ({ contents }) => {
		const uploadResult = await uploadFilesASync();
		const medias: CreateMediaType[] = uploadResult.map((data, index) =>
			createMedia(data, index),
		);

		if (!isFeedId) {
			await createFeedASync({
				contents: contents,
				isPublic: isPublic === 'public' ? true : false,
				groupId: isSelecteGroup,
				medias: medias,
			});
		}

		if (isFeedId) {
			await updateFeedASync({
				feedId: isFeedId,
				contents: contents,
				isPublic: isPublic === 'public' ? true : false,
				groupId: isSelecteGroup,
				medias: medias,
			});
		}
	};

	// 드래그 이벤트를 감지하는 ref 참조변수 (label 태그에 들어갈 예정)
	const dragRef = useRef<HTMLLabelElement | null>(null);
	const navigationPrevRef = React.useRef(null);
	const navigationNextRef = React.useRef(null);
	const swiperRef = useRef<SwiperCore>();

	return (
		<div className={styles.create_feed_container}>
			{isFeedPage === 'selectGroup' && (
				<div>
					<div className={styles.selectedGroup_title}>그룹선택</div>
					<div className={styles.selectedGroup_groups_container}>
						{isLoading || !data ? (
							<Skeleton />
						) : (
							data.map(group => (
								<div className={styles.group_card_wrap} key={group.id}>
									<GroupProfile
										group={{
											id: group.group.id,
											groupDescription: group.group.groupDescription,
											groupName: group.group.groupName,
										}}
										onSelectedGroup={handleSelectedGroup}
										isSelecteGroup={isSelecteGroup}
									/>
								</div>
							))
						)}
					</div>
					<div className={styles.selectedGroup_description}>
						위의 그룹 리스트내에서 어떤 그룹에서 새 게시물을 작성할지 선택
						해주세요.
					</div>
					<div className={styles.button_container}>
						<CustomButton
							type="button"
							className="mt-8 mb-4 bg-customOrange text-customDark 
								font-bold border border-solid border-customDark 
								rounded-full p-[10px]
								w-full hover:bg-orange-500
								"
							onClick={() => handleChangePage('uploadMedia')}
						>
							다음
						</CustomButton>
					</div>
				</div>
			)}
			{isFeedPage === 'uploadMedia' && (
				<div>
					{isUplaod ? (
						<div className={styles.uploaded_container}>
							{/* {isImageUrl.map((url, index) => (
								<div key={index} className="w-1/2">
									<div className="relative h-40 border border-solid border-customDark">
										<Image
											fill
											src={url}
											alt="image"
											style={{ objectFit: 'contain' }}
										/>
									</div>
								</div>
								
							))} */}
							<Swiper
								className={styles.uploaded_swiper}
								modules={[Navigation, Pagination, A11y]}
								spaceBetween={50}
								slidesPerView={1}
								navigation={{
									prevEl: navigationPrevRef.current,
									nextEl: navigationNextRef.current,
								}}
								onBeforeInit={swiper => {
									swiperRef.current = swiper;
								}}
								pagination={{
									clickable: true,
								}}
								// pagination={{
								// 	el: paginationRef.current,
								// 	clickable: true,
								// 	renderBullet: function (index: number, className: string) {
								// 		console.log('clss=', className);
								// 		return (
								// 			'<span class="' +
								// 			className +
								// 			'">' +
								// 			(index + 1) +
								// 			'</span>'
								// 		);
								// 	},
								// }}
								onSwiper={swiper => console.log(swiper)}
								onSlideChange={() => console.log('slide change')}
							>
								{isImageUrl.map((url, index) => (
									<SwiperSlide
										key={index}
										className={styles.uploaded_swiper_slide}
									>
										<Image
											fill
											src={url}
											alt="image"
											style={{ objectFit: 'inherit' }}
										></Image>
										<div
											className={styles.uploaded_close}
											onClick={() => handleExcludeMedia(index)}
										>
											<AiOutlineClose size={24} color="#0a0a0a" />
										</div>
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
						</div>
					) : (
						<>
							<div className={styles.upload_title}>
								사진과 동영상을 업로드하세요.
							</div>
							<div className={styles.drag_drop}>
								<input
									type="file"
									multiple={true}
									id="fileUpload"
									style={{ display: 'none' }}
									onChange={handleAddDocuments}
								/>

								<label htmlFor="fileUpload" ref={dragRef}>
									<div>여기 클릭!</div>
								</label>
							</div>
						</>
					)}

					<div className={styles.button_container}>
						<CustomButton
							type="button"
							className="mt-8 mb-4 bg-white text-customDark 
										font-bold border border-solid border-customDark 
										rounded-full p-[10px] w-full hover:opacity-80"
							onClick={() => handleChangePage('selectGroup')}
						>
							이전
						</CustomButton>
						<CustomButton
							type="button"
							className="mt-8 mb-4 bg-customOrange text-customDark 
								font-bold border border-solid border-customDark 
								rounded-full p-[10px]
								w-full hover:bg-orange-500
								"
							onClick={() =>
								isFiles.length !== 0 && handleChangePage('writeFeed')
							}
							disabled={isFiles.length === 0}
						>
							다음
						</CustomButton>
					</div>
				</div>
			)}

			{isFeedPage === 'writeFeed' && (
				<div>
					<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
						<div className={styles.form_top_wrap}>
							<Profile
								username="양광성"
								isPublic={isPublic}
								onChageIsPublic={handleChageIsPublic}
							/>
							<div className={styles.form_top_group_container}>
								<GroupProfile
									group={{
										id: 'sdfsdf',
										groupDescription: '양씨 가족의 그룹입니다',
										groupName: '양씨네가족',
									}}
								/>
							</div>
						</div>
						{/* <div className="my-5">
							<select
								{...register('isPublic')}
								defaultValue={
									feed?.isPublic
										? feed.isPublic === true
											? 'public'
											: 'private'
										: 'public'
								}
							>
								<option value={'public'}>공개</option>
								<option value={'private'}>비공개</option>
							</select>
						</div> */}
						<div className={styles.form_field_container}>
							<FieldWithTextarea
								fieldClass="inline_textarea"
								{...register('contents', {
									required: '피드 글을 작성해주세요!',
									maxLength: {
										value: 2000,
										message: '최대 2000자까지 가능합니다',
									},
								})}
								placeholder="피드 글을 작성 해보세요"
								defaultValue={feed?.contents}
								error={errors.contents}
							/>
						</div>
						<div className={styles.form_swiper_container}>
							<Swiper
								className={styles.swiper}
								modules={[Navigation, Pagination, A11y]}
								spaceBetween={50}
								slidesPerView={1}
								navigation
								pagination={{ clickable: true }}
								onSwiper={swiper => console.log(swiper)}
								onSlideChange={() => console.log('slide change')}
							>
								{isImageUrl.map((url, index) => (
									<SwiperSlide key={index}>
										<Image
											fill
											src={url}
											alt="image"
											style={{ objectFit: 'contain' }}
										></Image>
									</SwiperSlide>
								))}
							</Swiper>
						</div>

						<Line />

						<div className={styles.button_container}>
							{/* <CustomButton
								type="button"
								className="mt-8 mb-4 bg-white text-customDark 
										font-bold border border-solid border-customDark 
										rounded-full p-[10px] w-full hover:opacity-80"
								onClick={() => handleChangePage('uploadMedia')}
							>
								이전
							</CustomButton> */}
							<div className={styles.emoji_container}>
								<FaRegSmile
									className={styles.emoji_icon}
									size={28}
									onClick={handleEmojiView}
									color="#0a0a0a"
								/>
								{isEmoji && (
									<div className={styles.emoji_view_container}>
										<EmojiPicker
											height={400}
											autoFocusSearch={false}
											searchDisabled={true}
											skinTonesDisabled={true}
											onEmojiClick={handleAddEmojiValue}
										/>
									</div>
								)}
							</div>
							<CustomButton
								type="submit"
								className="ml-auto bg-customOrange text-customDark 
								font-bold border border-solid border-customDark 
								rounded-full p-[10px]
								w-1/2 hover:bg-orange-500
								"
								disabled={!isValid}
							>
								게시하기
							</CustomButton>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};

export default CreateFeed;
