import ScheduleCreate from '@/components/screens/schedule/create/ScheduleCreate';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const ScheduleEditPage: NextPage = () => {
	return <ScheduleCreate edit={true} />;
};

export default ScheduleEditPage;
