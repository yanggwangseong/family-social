import React, { ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
	title: string;
	children?: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
}

class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: { title: string }) {
		super(props);

		// Define a state variable to track whether is an error or not
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(): ErrorBoundaryState {
		// Update state so the next render will show the fallback UI

		return { hasError: true };
	}

	handleGoMain = async () => {
		location.href = '/feeds';
	};

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		// You can use your own error logging service here
		console.log({ error, errorInfo });

		console.log(error.message);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div>
					<h1>{this.props.title}</h1>
					<h3>서비스 에러가 발생 하였습니다.</h3>
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
						<button type="button" onClick={this.handleGoMain}>
							메인 사이트로 돌아가기
						</button>
					</div>
				</div>
			);
		}

		// Return children components in case of no error

		return this.props.children;
	}
}

export default ErrorBoundary;
