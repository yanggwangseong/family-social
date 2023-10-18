import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import GroupProfile from '@/components/ui/profile/group-profile/GroupProfile';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import styles from './CreateFeed.module.scss';
import { useQuery } from 'react-query';
import { GroupService } from '@/services/group/group.service';
import { AuthService } from '@/services/auth/auth.service';
import Image from 'next/image';

const CreateFeed: FC = () => {
	const [isFeedPage, setIsFeedPage] = useState('selectGroup');
	const [isSelecteGroup, setIsSelectGroup] = useState('');

	const [isFiles, setIsFiles] = useState<File[]>();
	const [isImageUrl, setIsImageUrl] = useState<string[]>([]);

	const handleAddDocuments = async (event: ChangeEvent<HTMLInputElement>) => {
		const uploadedFiles: File[] = Array.from(event.target.files || []);
		const blobArrayImage: string[] = uploadedFiles.map(file =>
			URL.createObjectURL(file),
		);
		setIsImageUrl(isImageUrl.concat(...blobArrayImage));
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
	// [TODO] 1. 그룹을 먼저 선택한다. (O)
	// [TODO] 2. 이미지 또는 미디어를 올린다.
	// [TODO] 3. 피드 공개/비공개 선택 셀렉트박스 추가 피드 글 내용 작성.

	const handleChangePage = (page: string) => {
		setIsFeedPage(page);
	};

	const handleSelectedGroup = (groupId: string) => {
		setIsSelectGroup(groupId);
	};

	const handleCreateFeed = async () => {
		if (isFiles) {
			const result = await AuthService.uploadfile(isFiles);
			console.log(result);
		}
	};

	const { data, isLoading } = useQuery(
		['member-belong-to-groups'],
		async () => await GroupService.getMemberBelongToGroups(),
	);

	if (isLoading) return <div>Loading</div>;
	if (!data) return null;

	return (
		<div className={styles.create_feed_container}>
			{isFeedPage === 'selectGroup' && (
				<div>
					<div className={styles.selectedGroup_title}>그룹선택</div>
					<div className={styles.selectedGroup_groups_container}>
						{data.map(group => (
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
						))}
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
							onClick={() => handleChangePage('writeFeed')}
						>
							다음
						</CustomButton>
					</div>
				</div>
			)}

			{isFeedPage === 'writeFeed' && (
				<div>
					<div>
						{isImageUrl.map((url, index) => (
							<Image
								key={index}
								width={300}
								height={300}
								src={url}
								alt="image"
							></Image>
						))}
					</div>

					<div className={styles.selectedGroup_button_container}>
						<CustomButton
							type="button"
							className="mt-8 mb-4 bg-white text-customDark 
										font-bold border border-solid border-customDark 
										rounded-full p-[10px] w-full hover:opacity-80"
							onClick={() => handleChangePage('uploadMedia')}
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
							onClick={handleCreateFeed}
						>
							게시하기
						</CustomButton>
					</div>
				</div>
			)}
		</div>
	);
};

export default CreateFeed;
