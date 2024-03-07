import React, { FC } from 'react';
import styles from './MainSidebar.module.scss';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import Menu from '../menu/Menu';
import { AiOutlineAudit, AiOutlineSchedule } from 'react-icons/ai';
import { MdOutlineManageAccounts } from 'react-icons/md';
import { useRecoilState } from 'recoil';
import { modalAtom, modalLayerAtom } from '@/atoms/modalAtom';
import { LayerMode } from 'types';
import { feedIdAtom } from '@/atoms/feedIdAtom';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
	PiUserCircleGearDuotone,
	PiCalendarCheckDuotone,
	PiArticleDuotone,
} from 'react-icons/pi';

const MainSidebar: FC = () => {
	const router = useRouter();
	const { pathname } = router;
	const isSchedulesRoute = pathname.startsWith('/schedules');

	const [isShowing, setIsShowing] = useRecoilState(modalAtom);
	const [, setIsLayer] = useRecoilState(modalLayerAtom);
	const [, setIsFeedId] = useRecoilState(feedIdAtom);

	const handleCreateFeed = () => {
		setIsShowing(!isShowing); // layer modal 보여주기
		setIsLayer({
			modal_title: '새 게시물 만들기',
			layer: LayerMode.createFeed,
		}); // layer modal 어떤 layer를 보여 줄건지

		setIsFeedId(''); // 수정모드 아니게 feedId 전역변수 초기화
	};

	return (
		<div className={styles.sidebar_container}>
			{/* 사이드 메뉴 */}
			<Menu link="/feeds" Icon={PiArticleDuotone} menu="피드" />
			<Menu link="/schedules" Icon={PiCalendarCheckDuotone} menu="여행 일정" />
			<Menu link="/accounts" Icon={PiUserCircleGearDuotone} menu="계정" />
			<div className={styles.sidebar_btn_container}>
				{isSchedulesRoute ? (
					<Link
						className="mt-8 bg-customOrange text-customDark 
						font-bold border border-solid border-customDark 
						rounded-full p-[10px]
						w-full hover:bg-orange-500 inline-block text-center
						shadow-button-shadow
						"
						href={`/schedules/create`}
					>
						+ 일정 만들기
					</Link>
				) : (
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
				)}
			</div>
		</div>
	);
};

export default MainSidebar;
