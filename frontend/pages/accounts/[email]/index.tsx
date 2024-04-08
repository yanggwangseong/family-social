import Account from '@/components/screens/account/Account';
import { validEmail } from '@/components/screens/sign-up/sign-up.constants';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';

const AccountsPage: NextPage<{ email: string }> = ({ email }) => {
	return <Account email={email} />;
};

export default AccountsPage;

export const getServerSideProps = (async context => {
	const { email } = context.params as { email: string };

	const reg = new RegExp(validEmail);
	const existsUrl = reg.test(email);

	if (!existsUrl) {
		return {
			notFound: true,
		};
	}
	return {
		props: {
			email,
		},
	};
}) satisfies GetServerSideProps;
