import React, { FC } from 'react';
import styles from './MainSidebar.module.scss';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import Menu from '../menu/Menu';
import { AiOutlineAudit, AiOutlineSchedule } from 'react-icons/ai';
import { MdOutlineManageAccounts } from 'react-icons/md';
import { useRecoilState } from 'recoil';
import { modalAtom, modalLayerAtom } from '@/atoms/modalAtom';
import { LayerMode } from 'types';

const MainSidebar: FC = () => {
	const [isShowing, setIsShowing] = useRecoilState(modalAtom);
	const [, setIsLayer] = useRecoilState(modalLayerAtom);

	const handleCreateFeed = () => {
		setIsShowing(!isShowing); // layer modal 보여주기
		setIsLayer({
			modal_title: '새 게시물 만들기',
			layer: LayerMode.createFeed,
		}); // layer modal 어떤 layer를 보여 줄건지
	};

	return (
		<div className={styles.sidebar_container}>
			{/* 사이드 메뉴 */}
			<Menu link="/feeds" Icon={AiOutlineAudit} menu="피드" />
			<Menu link="/schdules" Icon={AiOutlineSchedule} menu="일정작성" />
			<Menu link="/profile" Icon={MdOutlineManageAccounts} menu="계정" />
			<div className={styles.sidebar_btn_container}>
				<CustomButton
					type="button"
					className="mt-8 bg-customOrange text-customDark 
            font-bold border border-solid border-customDark 
            rounded-full p-[10px]
            w-full hover:bg-orange-500
            "
					onClick={handleCreateFeed}
				>
					+ 피드
				</CustomButton>
			</div>
		</div>
	);
};

export default MainSidebar;