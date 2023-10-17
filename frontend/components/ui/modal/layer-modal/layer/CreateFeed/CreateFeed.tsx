import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import GroupProfile from '@/components/ui/profile/group-profile/GroupProfile';
import React, { FC, useState } from 'react';
import styles from './CreateFeed.module.scss';

const CreateFeed: FC = () => {
	const [isFeedPage, setIsFeedPage] = useState('selectGroup');
	const [isSelecteGroup, setIsSelectGroup] = useState('');
	// [TODO] 1. 그룹을 먼저 선택한다. (O)
	// [TODO] 2. 이미지 또는 미디어를 올린다.
	// [TODO] 3. 피드 공개/비공개 선택 셀렉트박스 추가 피드 글 내용 작성.

	const handleChangePage = (page: string) => {
		setIsFeedPage(page);
	};

	const handleSelectedGroup = (groupId: string) => {
		setIsSelectGroup(groupId);
	};
	return (
		<div className="mt-10">
			{isFeedPage === 'selectGroup' && (
				<div>
					<div className={styles.selectedGroup_title}>그룹선택</div>
					<div className="flex flex-wrap overflow-y-auto h-72 mt-5 py-5">
						<div className="w-full">
							<GroupProfile
								group={{
									id: 'sdfsdf1',
									groupDescription: 'ghggg',
									groupName: 'sdfsdf',
								}}
								onSelectedGroup={handleSelectedGroup}
								isSelecteGroup={isSelecteGroup}
							/>
						</div>
						<div className="w-full">
							<GroupProfile
								group={{
									id: 'sdfsdf2',
									groupDescription: 'ghggg',
									groupName: 'sdfsdf',
								}}
								onSelectedGroup={handleSelectedGroup}
								isSelecteGroup={isSelecteGroup}
							/>
						</div>
						<div className="w-full">
							<GroupProfile
								group={{
									id: 'sdfsdf3',
									groupDescription: 'ghggg',
									groupName: 'sdfsdf',
								}}
								onSelectedGroup={handleSelectedGroup}
								isSelecteGroup={isSelecteGroup}
							/>
						</div>
					</div>
					<div className="mt-5 font-light text-sm">
						위의 그룹 리스트내에서 어떤 그룹에서 새 게시물을 작성할지 선택
						해주세요.
					</div>
					<div className="flex w-full gap-5">
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
					<div className="flex w-full gap-5">
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
							onClick={() => handleChangePage('uploadMedia')}
						>
							다음
						</CustomButton>
					</div>
				</div>
			)}
		</div>
	);
};

export default CreateFeed;
