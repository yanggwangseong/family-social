import React, { FC, useEffect, useState } from 'react';
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
import Link from 'next/link';

const RightSidebar: FC = () => {
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
		async () => await GroupService.getMembersBelongToGroup(isSelecteGroup),
		{
			enabled: !!isSelecteGroup,
		},
	);

	useEffect(() => {
		/**
		 * 최초 로드시에 isSelectGroup이 없으므로 첫번째 그룹으로 설정
		 */
		if (!isSelecteGroup && groupList && groupList.length > 0) {
			handleSelectedGroup(groupList[0].group.id);
		}
	}, [groupList, handleSelectedGroup, isSelecteGroup]);

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
						<div className={styles.group_title}>관리중인 그룹</div>
						{groupList
							.filter(data => data.role === 'main')
							.map((item, index) => (
								<Link href={`/groups/${item.group.id}`} key={index}>
									<GroupProfile key={index} group={item.group}></GroupProfile>
								</Link>
							))}
						<div className={styles.group_title}>참여중인 그룹</div>
						{groupList
							.filter(data => data.role === 'user')
							.map((item, index) => (
								<Link href={`/groups/${item.group.id}`} key={index}>
									<GroupProfile group={item.group}></GroupProfile>
								</Link>
							))}
					</div>
				))}
		</div>
	);
};

export default RightSidebar;
