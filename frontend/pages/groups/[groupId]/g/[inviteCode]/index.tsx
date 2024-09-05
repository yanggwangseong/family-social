import { useRouter } from 'next/router';
import React, { FC } from 'react';

const GroupDetailInviteCodePage: FC = () => {
	const router = useRouter();
	const { inviteCode } = router.query as { inviteCode: string };

	return <div>{inviteCode}</div>;
};

export default GroupDetailInviteCodePage;
