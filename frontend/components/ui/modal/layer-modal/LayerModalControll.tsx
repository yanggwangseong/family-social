import React, { FC } from 'react';
import EmailInvite from './layer/EmailInvite';
import LinkInvite from './layer/LinkInvite';
import { LayerMode, Union } from 'types';
import GroupDeleteConfirm from './layer/GroupDeleteConfirm';

const StatusLookUpTable = {
	[LayerMode.ready]: EmailInvite,
	[LayerMode.progress]: LinkInvite,
	[LayerMode.groupDeleteConfirm]: GroupDeleteConfirm,
};

interface StatusProps {
	status: Union<typeof LayerMode>;
}

const LayerModalControll: FC<StatusProps> = ({ status }) => {
	if (typeof StatusLookUpTable[status] !== 'undefined') {
		return React.createElement(StatusLookUpTable[status]);
	}
	return <div>오류가 발생했습니다. 고객센터로 문의 바랍니다.</div>;
};

export default LayerModalControll;
