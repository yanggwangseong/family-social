import React, { FC } from 'react';
import styles from './GroupCreate.module.scss';
import Format from '@/components/ui/layout/Format';
import Header from '@/components/ui/header/Header';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Field from '@/components/ui/field/Field';
import Link from 'next/link';
import Profile from '@/components/ui/profile/Profile';

const GroupCreate: FC = () => {
	return (
		<Format title={'group-create'}>
			<div className={styles.container}>
				{/* 헤더 */}
				<Header />
				<form className={styles.form}>
					<div className={styles.contents_card}>
						<div className={styles.contents_wrap}>
							<div className="flex">
								<Link
									className="p-4 border border-solid border-customDark rounded-full"
									href={'/groups'}
								>
									<AiOutlineArrowLeft size={20}></AiOutlineArrowLeft>
								</Link>

								<div className="text-2xl font-bold flex justify-center items-center ml-7">
									Back
								</div>
							</div>

							<div className={styles.page_label_container}>
								<div className={styles.page_label}>그룹 {'>'} 그룹 만들기</div>
								<div className={styles.page_title}>그룹 만들기</div>
							</div>

							<div className="mt-12">
								<Profile />
							</div>

							<div className="mt-12">
								<div className={styles.form_label}>그룹명</div>
								<Field></Field>
								<div className={styles.form_label}>그룹설명</div>
								<div>
									<textarea
										className="border border-solid border-customDark bg-basic 
									rounded-2xl w-full py-2 px-4
									focus:outline-none
									"
									></textarea>
								</div>
							</div>
						</div>
						<div className={styles.footer_wrap}>
							<CustomButton
								type="submit"
								className="mt-8 bg-customOrange text-customDark 
								font-bold border border-solid border-customDark 
								rounded-full py-4 px-4
								w-full hover:bg-orange-500
								"
							>
								만들기
							</CustomButton>
						</div>
					</div>
				</form>
			</div>
		</Format>
	);
};

export default GroupCreate;
