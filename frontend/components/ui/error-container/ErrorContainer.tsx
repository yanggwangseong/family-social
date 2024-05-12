import React, { FC } from 'react';
import { ErrorContainerProps } from './error-container.interface';
import errorAnimation from '@/assets/lottie/errorboundary.json';
import Lottie from 'lottie-react';
import styles from './ErrorContainer.module.scss';
import Format from '../layout/Format';

const ErrorContainer: FC<ErrorContainerProps> = ({ title, handleGoMain }) => {
	return (
		<main className={styles.main_container}>
			<div className={styles.container}>
				<div className={styles.contents_container}>
					<Lottie
						className={styles.lottie_container}
						animationData={errorAnimation}
						loop={true}
					/>
					<h3 className={styles.error_title}>{title}</h3>
					<p className={styles.error_text}>
						죄송합니다.
						<br />
						기술적인 문제로
						<br />
						일시적으로 서비스를 사용할 수 없습니다.
						<br />
						관리자에게 요청하여
						<br />
						빠른 시간 안에 해결 하겠습니다.
					</p>

					<div className={styles.btn_container}>
						<button
							type="button"
							onClick={handleGoMain}
							className={styles.home_btn}
						>
							메인 사이트로 돌아가기
						</button>
					</div>
				</div>
			</div>
		</main>
	);
};

export default ErrorContainer;
