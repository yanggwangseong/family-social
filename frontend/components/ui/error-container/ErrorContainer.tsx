import React, { FC } from 'react';
import { ErrorContainerProps } from './error-container.interface';
import errorAnimation from '@/assets/lottie/errorboundary.json';
import Lottie from 'lottie-react';

const ErrorContainer: FC<ErrorContainerProps> = ({ title, handleGoMain }) => {
	return (
		<div>
			<Lottie animationData={errorAnimation} loop={true} />
			<h3>{title}</h3>
			<p>
				<br />
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

			<div>
				<button type="button" onClick={handleGoMain}>
					메인 사이트로 돌아가기
				</button>
			</div>
		</div>
	);
};

export default ErrorContainer;
