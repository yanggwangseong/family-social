import ErrorContainer from '@/components/ui/error-container/ErrorContainer';
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
				<ErrorContainer
					title={this.props.title}
					handleGoMain={this.handleGoMain}
				/>
			);
		}

		// Return children components in case of no error
		return this.props.children;
	}
}

export default ErrorBoundary;
