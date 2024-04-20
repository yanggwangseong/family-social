import { toggleVariant } from '@/utils/animation/toggle-variant';
import { motion } from 'framer-motion';
import React, { FC } from 'react';

const LinkInvite: FC = () => {
	return <motion.div variants={toggleVariant}>2</motion.div>;
};

export default LinkInvite;
