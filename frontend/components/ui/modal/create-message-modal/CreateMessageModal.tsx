import React, { FC, useState } from 'react';
import styles from './CreateMessageModal.module.scss';
import { IoCloseSharp } from 'react-icons/io5';
import { MdGroups } from 'react-icons/md';
import { useRecoilState } from 'recoil';
import { createMessageModalAtom } from '@/atoms/createMessageModalAtom';
import Field from '@/components/ui/field/Field';
import Line from '../../line/Line';
import Profile from '../../profile/Profile';
import { useQuery } from 'react-query';
import { useSearch } from '@/hooks/useSearch';
import {
	MessageModalAtomType,
	messageModalAtom,
} from '@/atoms/messageModalAtom';
import { SearchService } from '@/services/search/search.service';
import NotFoundSearch from '../../not-found/search/NotFoundSearch';
import { NOT_FOUND_MEMBER_MESSAGE } from '@/constants/index';
import { SearchMemberResponse } from '@/shared/interfaces/member.interface';

const CreateMessageModal: FC = () => {
	const [createLayer, setCreateLayer] = useRecoilState<boolean>(
		createMessageModalAtom,
	);

	const [invitedMembers, setInvitedMembers] = useState<SearchMemberResponse[]>(
		[],
	);

	const handleAddMember = (member: SearchMemberResponse) => {
		setInvitedMembers(prev => [...prev, member]);
	};

	const [layer, setLayer] =
		useRecoilState<MessageModalAtomType>(messageModalAtom);

	const { handleSearch, debounceSearch } = useSearch();

	const { isSuccess, data } = useQuery(
		['search-chat-members', debounceSearch],
		async () => await SearchService.getMembersByUserName(debounceSearch),
		{
			enabled: !!debounceSearch,
		},
	);

	const handleCreateMessageModal = () => {
		setCreateLayer(false);
	};

	const handleCreateNewMessageModal = () => {
		setCreateLayer(false);
		setLayer({
			chatId: '',
			isMessageModal: true,
			isNewMessage: true,
		});
	};

	const handleDeleteMember = (member: SearchMemberResponse) => {
		setInvitedMembers(prev => prev.filter(item => item.id !== member.id));
	};

	return (
		<>
			{createLayer && (
				<div className={styles.container}>
					<div className={styles.content}>
						<div className={styles.top_container}>
							<div className={styles.top_wrap}>
								<div className={styles.title}>새 메세지</div>
								<div
									className={styles.close_btn}
									onClick={handleCreateMessageModal}
								>
									<IoCloseSharp size={24} />
								</div>
							</div>
						</div>
						<div>
							<Field
								fieldClass="small_inline_input"
								labelText={'채팅 상대'}
								placeholder="채팅 상대를 검색 해주세요."
								onChange={handleSearch}
							></Field>
						</div>
						{invitedMembers.length > 0 && (
							<div className={styles.invited_members_container}>
								{invitedMembers.map((member, index) => (
									<div key={index} className={styles.invited_member}>
										<div className={styles.invited_member_username}>
											{member.username}
										</div>
										<div
											className={styles.invited_member_delete_btn}
											onClick={() => handleDeleteMember(member)}
										>
											<IoCloseSharp size={18} />
										</div>
									</div>
								))}
							</div>
						)}

						<Line />

						{!isSuccess && (
							<>
								<div className={styles.group_chat_container}>
									<div className={styles.group_chat_icon_container}>
										<MdGroups size={22} />
									</div>
									<div className={styles.group_chat_text}>그룹 채팅 만들기</div>
								</div>
								<Line />
							</>
						)}

						{isSuccess && (
							<div className={styles.search_lst_container}>
								{data?.length ? (
									data
										.filter(
											item =>
												!invitedMembers.some(member => member.id === item.id),
										)
										.map((item, index) => (
											<div key={index}>
												<Profile
													username={item.username}
													isDirectChat={true}
													handleAddMember={handleAddMember}
													chatSearchMember={item}
												></Profile>
											</div>
										))
								) : (
									<NotFoundSearch message={NOT_FOUND_MEMBER_MESSAGE} />
								)}
							</div>
						)}
					</div>
					{invitedMembers.length > 0 && (
						<div className={styles.create_chat_button_container}>
							<button
								className={styles.create_chat_button}
								onClick={handleCreateNewMessageModal}
							>
								채팅방 생성하기
							</button>
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default CreateMessageModal;
