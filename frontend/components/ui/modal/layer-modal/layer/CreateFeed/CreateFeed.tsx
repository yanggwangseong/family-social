import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import GroupProfile from '@/components/ui/profile/group-profile/GroupProfile';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
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

const CreateFeed: FC = () => {
	const [isFeedId, setIsFeedId] = useRecoilState(feedIdAtom);

	const [, setIsShowing] = useRecoilState<boolean>(modalAtom);

	const [isFeedPage, setIsFeedPage] = useState('selectGroup');
	const [isSelecteGroup, setIsSelectGroup] = useState('');

	const [isFiles, setIsFiles] = useState<File[]>([]);
	const [isImageUrl, setIsImageUrl] = useState<string[]>([]);

	const queryClient = useQueryClient();

	const { data, isLoading } = useQuery(
		['member-belong-to-groups'],
		async () => await GroupService.getMemberBelongToGroups(),
	);

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
		const blobArrayImage: string[] = uploadedFiles.map(file =>
			URL.createObjectURL(file),
		);
		resetImageUrl(); // 배열을 초기화 해준다.
		setIsImageUrl(blobArrayImage);
		setIsFiles(uploadedFiles);
		//const result = await AuthService.uploadfile(uploadedFiles);
		//console.log(result);
		// const files = uploadedFiles.map(file => ({
		// 	file,
		// }));
	};

	useEffect(() => {
		return () => {
			// 컴포넌트가 언마운트될 때 URL을 제거
			if (isImageUrl) {
				isImageUrl.map(url => {
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

	const handleSelectedGroup = (groupId: string) => {
		setIsSelectGroup(groupId);
	};

	const onSubmit: SubmitHandler<CreateFeedFields> = async ({
		contents,
		isPublic,
	}) => {
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
					<div className={styles.selectedGroup_button_container}>
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
					<div className="mt-10">사진과 동영상을 업로드하세요.</div>
					<input type="file" multiple={true} onChange={handleAddDocuments} />
					<div className={styles.selectedGroup_button_container}>
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
						<Profile username="양광성" role="관리자" />
						<div className="my-5">
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
						</div>
						<div>
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
						<div className="mt-5">
							<Swiper
								className="w-full h-72 relative"
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

						<div className={styles.selectedGroup_button_container}>
							{/* <CustomButton
								type="button"
								className="mt-8 mb-4 bg-white text-customDark 
										font-bold border border-solid border-customDark 
										rounded-full p-[10px] w-full hover:opacity-80"
								onClick={() => handleChangePage('uploadMedia')}
							>
								이전
							</CustomButton> */}
							<div className="mr-2 relative flex justify-center items-center">
								<FaRegSmile
									className={'cursor-pointer'}
									size={28}
									onClick={handleEmojiView}
								/>
								{isEmoji && (
									<div className=" absolute z-10 -top-[420px] left-0">
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
