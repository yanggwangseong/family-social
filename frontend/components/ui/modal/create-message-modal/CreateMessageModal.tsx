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
import { MemberService } from '@/services/member/member.service';
import {
	MessageModalAtomType,
	MessageModalDefaultValue,
	messageModalAtom,
} from '@/atoms/messageModalAtom';

const CreateMessageModal: FC = () => {
	const [createLayer, setCreateLayer] = useRecoilState<boolean>(
		createMessageModalAtom,
	);

	const [layer, setLayer] =
		useRecoilState<MessageModalAtomType>(messageModalAtom);

	const { handleSearch, debounceSearch } = useSearch();

	const { isSuccess, data } = useQuery(
		['search-chat-members', debounceSearch],
		() => MemberService.getMembersByUserName(debounceSearch),
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

	return (
		<>
			{createLayer && (
				<div className={styles.container}>
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
								data.map((item, index) => (
									<div key={index} onClick={handleCreateNewMessageModal}>
										<Profile username={item.username}></Profile>
									</div>
								))
							) : (
								<div className={styles.not_found_text}>
									해당 멤버를 찾을 수 없습니다.
								</div>
							)}
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default CreateMessageModal;
