import React, { FC } from 'react';
import styles from './CreateMessageModal.module.scss';
import { IoCloseSharp } from 'react-icons/io5';
import { MdGroups } from 'react-icons/md';
import { useRecoilState } from 'recoil';
import { createMessageModalAtom } from '@/atoms/createMessageModalAtom';
import Field from '@/components/ui/field/Field';
import Line from '../../line/Line';
import Profile from '../../profile/Profile';

const CreateMessageModal: FC = () => {
	const [createLayer, setCreateLayer] = useRecoilState<boolean>(
		createMessageModalAtom,
	);

	return (
		<>
			{createLayer && (
				<div className={styles.container}>
					<div className={styles.top_container}>
						<div className={styles.top_wrap}>
							<div className={styles.title}>새 메세지</div>
							<div className={styles.close_btn}>
								<IoCloseSharp size={24} />
							</div>
						</div>
					</div>

					<div>
						<Field
							fieldClass="small_inline_input"
							labelText={'채팅 상대'}
							placeholder="채팅 상대를 검색 해주세요."
						></Field>
					</div>
					<Line />
					{/* [TODO] 검색 키워드가 없을때만 view 보이기 */}
					<div className={styles.group_chat_container}>
						<div className={styles.group_chat_icon_container}>
							<MdGroups size={22} />
						</div>
						<div className={styles.group_chat_text}>그룹 채팅 만들기</div>
					</div>
					<Line />
					<div className={styles.search_lst_container}>
						<Profile username="양우성"></Profile>
						<Profile username="양우성"></Profile>
					</div>
				</div>
			)}
		</>
	);
};

export default CreateMessageModal;
