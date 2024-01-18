import React, { FC, useEffect, useState } from 'react';
import styles from './TourismItem.module.scss';
import { TourismItemProps } from './tourism-item.interface';
import Image from 'next/image';
import { AiFillHeart } from 'react-icons/ai';
import { AiFillStar } from 'react-icons/ai';
import { AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineCheck } from 'react-icons/ai';
import cn from 'classnames';
import {
	ContentTypeId,
	ContentTypeName,
} from '@/constants/content-type.constant';
import { PeriodsType, TourismType, periodAtom } from '@/atoms/periodAtom';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { selectedPeriodAtom } from '@/atoms/selectedPeriodAtom';
import { modalAtom, modalLayerAtom } from '@/atoms/modalAtom';
import { LayerMode } from 'types';

const TourismItem: FC<TourismItemProps> = ({ tour, onChangePeriods }) => {
	const router = useRouter();
	const query = router.query as {
		menu: 'TOURCONTENTTYPE' | 'FESTIVAL' | 'TOURSEARCH';
	};

	const [isPeriods, setIsPeriods] = useRecoilState(periodAtom);
	const [isShowing, setIsShowing] = useRecoilState(modalAtom);
	const [, setIsLayer] = useRecoilState(modalLayerAtom);

	const [isSelectedPeriod, setIsSelectedPeriod] =
		useRecoilState(selectedPeriodAtom);

	const [isAddTourism, setIsAddTourism] = useState<string>('');

	const handleChagePeriods = (tour: {
		contentId: string;
		stayTime: string;
		tourismImage: string;
		title: string;
	}) => {
		setIsPeriods(prev => {
			const updatedPeriods = prev.map(item => {
				if (item.period === isSelectedPeriod) {
					return {
						...item,
						tourism: [
							...(item.tourism || []),
							{
								contentId: tour.contentId,
								stayTime: tour.stayTime,
								tourismImage: tour.tourismImage,
								title: tour.title,
								position: item.tourism ? item.tourism.length : 0,
							},
						],
					};
				}
				return item;
			});

			return updatedPeriods;
		});

		setIsAddTourism(tour.contentId);
	};

	const handleDeleteTourism = (contentId: string) => {
		const newPeriods = isPeriods.map(item => ({
			...item,
			tourism: item.tourism?.filter(v => contentId !== v.contentId),
		}));
		setIsPeriods(newPeriods);
		setIsAddTourism('');
	};

	const handleTourismDetailLayerModal = () => {
		setIsShowing(!isShowing);
		setIsLayer({
			modal_title: tour.title,
			layer: LayerMode.tourismDetail,
		});
	};

	// 관광 타입이나 행사/축제/ 키워드 검색 어디든 이미 담은 관광 아이템이라면 또 갈일 없으니까 체크 상태 유지 해주기
	useEffect(() => {
		if (isSelectedPeriod) {
			setIsAddTourism(''); // 기본 default값으로 비우고 이후에 속하는 contentId만 담기
			isPeriods.map(item =>
				item.tourism?.map(v => {
					if (v.contentId === tour.contentid) {
						setIsAddTourism(v.contentId);
					}
				}),
			);
		}
	}, [isPeriods, isSelectedPeriod, tour.contentid]);

	return (
		<div className={styles.container}>
			<div className={styles.tour_item_card}>
				<div
					className={styles.tour_img_title_container}
					onClick={handleTourismDetailLayerModal}
				>
					<div className={styles.img_container}>
						<Image
							width={120}
							height={100}
							src={tour.firstimage}
							alt="img"
							style={{ height: '100px' }}
						></Image>
					</div>
					<div className={styles.tour_description_container}>
						<div className={styles.tour_title}>{tour.title}</div>
						<div className={styles.tour_addr_container}>
							<div className={styles.tour_content_type_name}>
								{ContentTypeName['12']}
							</div>
							<div className={styles.tour_addr}>{tour.addr1}</div>
						</div>
						<div className={styles.tour_card_footer_container}>
							<div className={styles.heart_container}>
								<AiFillHeart size={14} color="#FB1F42" />
								<span className={styles.score}>0</span>
							</div>
							<div className={styles.star_container}>
								<AiFillStar size={14} color="rgb(253, 224, 71)" />
								<span className={styles.score}>0</span>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.tour_right_btn_container}>
					{isAddTourism && isAddTourism === tour.contentid ? (
						<div
							className={cn(styles.btn_container, {
								[styles.active]: isAddTourism === tour.contentid,
							})}
							onClick={() => handleDeleteTourism(tour.contentid)}
						>
							<AiOutlineCheck size={24} color="#0a0a0a" />
						</div>
					) : (
						<div className={styles.btn_container}>
							<AiOutlinePlus
								size={24}
								onClick={() =>
									handleChagePeriods({
										contentId: tour.contentid,
										stayTime: '02:40',
										tourismImage: tour.firstimage,
										title: tour.title,
									})
								}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default TourismItem;
