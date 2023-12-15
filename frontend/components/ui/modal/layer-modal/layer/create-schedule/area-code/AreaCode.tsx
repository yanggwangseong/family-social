import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import React, { FC } from 'react';
import styles from './AreaCode.module.scss';
import { TourService } from '@/services/tour/tour.service';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { areaCodeAtom } from '@/atoms/areaCodeAtom';
import cn from 'classnames';
import { modalAtom } from '@/atoms/modalAtom';

const AreaCode: FC = () => {
	const [isAreaCode, setIsAreaCode] = useRecoilState(areaCodeAtom);

	const [, setIsShowing] = useRecoilState<boolean>(modalAtom);

	const { data, isLoading } = useQuery(
		['tour-area-code-main'],
		async () => await TourService.getTourAreaCodes(),
	);

	const { data: areaCodeData, isLoading: areaCodeLoading } = useQuery(
		['tour-area-code-sub', isAreaCode.areaCodeMain],
		async () => await TourService.getTourAreaCodes(isAreaCode.areaCodeMain),
	);

	const selectedMainAreaCode = (code: string, name: string) => {
		setIsAreaCode({
			areaCodeMain: code,
			areaCodeMainName: name,
			areaCodeSub: '',
			areaCodeSubName: '',
		});
	};

	const selectedSubAreaCode = (code: string, name: string) => {
		setIsAreaCode({
			areaCodeMain: isAreaCode.areaCodeMain,
			areaCodeMainName: isAreaCode.areaCodeMainName,
			areaCodeSub: code,
			areaCodeSubName: name,
		});
	};

	const handleSelectedComplete = () => {
		setIsShowing(false);
	};

	if (isLoading) return <div>loading</div>;
	if (!data) return <div>loading</div>;

	return (
		<div className={styles.container}>
			<div className={styles.wrap}>
				<div className={styles.contents_wrap}>
					<div className={styles.area_code_container}>
						<div className={styles.area_code_main_item_wrap}>
							<div className={styles.area_code_header}>시/도</div>
							<div className={styles.area_code_lst_container}>
								{data.items.item.map(item => (
									<div className={styles.area_code_item_container}>
										<div
											className={cn(styles.area_code_item, {
												[styles.active]: isAreaCode.areaCodeMain === item.code,
											})}
											onClick={() => selectedMainAreaCode(item.code, item.name)}
										>
											{item.name.substring(0, 4)}
										</div>
									</div>
								))}
							</div>
						</div>
						<div className={styles.area_code_sub_item_wrap}>
							<div className={styles.area_code_header}>시/군/구</div>
							<div className={styles.area_code_lst_container}>
								{areaCodeData?.items.item.map(item => (
									<div className={styles.area_code_item_container}>
										<div
											className={cn(styles.area_code_item, {
												[styles.active]: isAreaCode.areaCodeSub === item.code,
											})}
											onClick={() => selectedSubAreaCode(item.code, item.name)}
										>
											{item.name}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				<div className={styles.btn_container}>
					<CustomButton
						type="button"
						className="bg-customDark text-customOrange 
							font-bold border border-solid border-customDark 
							rounded-full p-[10px] w-full hover:opacity-80"
						onClick={handleSelectedComplete}
					>
						확인
					</CustomButton>

					<CustomButton
						type="button"
						className="bg-white text-customDark 
							font-bold border border-solid border-customDark 
							rounded-full p-[10px] w-full hover:bg-gray-200"
						onClick={() => setIsShowing(false)}
					>
						취소
					</CustomButton>
				</div>
			</div>
		</div>
	);
};

export default AreaCode;
