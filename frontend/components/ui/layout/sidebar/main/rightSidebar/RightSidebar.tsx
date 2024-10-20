import React, { FC, useState } from 'react';
import styles from './RightSidebar.module.scss';
import cn from 'classnames';
import GroupProfile from '@/components/ui/profile/group-profile/GroupProfile';
import Profile from '@/components/ui/profile/Profile';
import { Union, rightSideTabMenus } from 'types';
import { useQuery } from 'react-query';
import Skeleton from '@/components/ui/skeleton/Skeleton';
import { GroupService } from '@/services/group/group.service';
import { useMemberBelongToGroups } from '@/hooks/use-query/useMemberBelongToGroups';
import GroupSelect from '@/components/ui/select/group/GroupSelect';

const RightSidebar: FC = () => {
	// const [selectedGroupId, setSelectedGroupId] = useState<string>('');

	const groupId = '75aca3da-1dac-48ef-84b8-cdf1be8fe37d';

	const {
		data: groupList,
		isLoading: groupLoading,
		handleSelectedGroup,
		isSelecteGroup,
	} = useMemberBelongToGroups();

	const [isMenu, setIsMenu] =
		useState<Union<typeof rightSideTabMenus>>('members');

	const handleChangeTabMenu = (item: Union<typeof rightSideTabMenus>) => {
		setIsMenu(item);
	};

	const { data, isLoading } = useQuery(
		['get-members', isSelecteGroup],
		async () => await GroupService.getMembersBelongToGroup(groupId),
		{
			enabled: !!isSelecteGroup,
		},
	);

	// const { data: groupList, isLoading: groupLoading } = useQuery(
	// 	['member-belong-to-groups'],
	// 	async () => await GroupService.getMemberBelongToGroups(),
	// );

	return (
		<div className={styles.right_sidebar_container}>
			<div className={styles.side_top_container}>
				<div className={styles.top_tab_menu}>
					<div
						className={cn(styles.top_tab_menu_item, {
							[styles.active]: isMenu === 'members',
						})}
						onClick={() => handleChangeTabMenu('members')}
					>
						멤버
					</div>
				</div>
				<div className={styles.top_tab_menu}>
					<div
						className={cn(styles.top_tab_menu_item, {
							[styles.active]: isMenu === 'groups',
						})}
						onClick={() => handleChangeTabMenu('groups')}
					>
						그룹
					</div>
				</div>
				<div className={styles.top_tab_menu}>
					<div
						className={cn(styles.top_tab_menu_item, {
							[styles.active]: isMenu === 'favorites',
						})}
						onClick={() => handleChangeTabMenu('favorites')}
					>
						즐겨찾기
					</div>
				</div>
			</div>

			{isMenu === 'members' &&
				(isLoading || !data || !groupList ? (
					<Skeleton />
				) : (
					<div className={styles.member_container}>
						{/* group-select-box */}
						<div className={styles.group_select_box}>
							<GroupSelect
								groupList={groupList}
								selectedGroupId={isSelecteGroup}
								onSelectedGroupId={handleSelectedGroup}
							/>
						</div>
						{/* <div className={styles.group_profile_container}>
							<GroupProfile
								group={{
									id: 'sdfsdf',
									groupDescription: '양씨네 가족입니다',
									groupName: '양씨네가족',
									groupCoverImage: '/images/banner/sm/group-base-sm.png',
								}}
							></GroupProfile>
						</div> */}
						<div className={styles.list_container}>
							{data.map((item, index) => (
								<Profile
									key={index}
									username={item.member.username}
									role={item.role}
									searchMember={item.member}
								/>
							))}
						</div>
					</div>
				))}

			{isMenu === 'groups' &&
				(groupLoading || !groupList ? (
					<Skeleton />
				) : (
					<div className={styles.list_container}>
						{groupList.map((item, index) => (
							<GroupProfile key={index} group={item.group}></GroupProfile>
						))}
					</div>
				))}
		</div>
	);
};

export default RightSidebar;
