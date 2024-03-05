import React, { FC } from 'react';
import styles from './CreateMessageModal.module.scss';
import { IoCloseSharp } from 'react-icons/io5';
import { useRecoilState } from 'recoil';
import { createMessageModalAtom } from '@/atoms/createMessageModalAtom';
import Field from '@/components/ui/field/Field';

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
				</div>
			)}
		</>
	);
};

export default CreateMessageModal;
