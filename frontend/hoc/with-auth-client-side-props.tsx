import { AuthService } from '@/services/auth/auth.service';
import { SearchMemberResponse } from '@/shared/interfaces/member.interface';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

export function withAuthClientSideProps<P extends object>(
	WrappedComponent: React.ComponentType<P & { authData: SearchMemberResponse }>,
): React.ComponentType<P> {
	const WithAuthClientSideProps: React.FC<P> = props => {
		const router = useRouter();

		const { data, isLoading, isError } = useQuery(
			'get-auth-member',
			AuthService.getAuthMember,
			{
				retry: false,
				onError: () => {
					router.push('/signin');
				},
			},
		);

		if (isLoading) {
			return <div>로딩 중...</div>;
		}

		if (isError || !data) {
			return null;
		}

		return <WrappedComponent authData={data} {...props} />;
	};

	return WithAuthClientSideProps;
}
