import { PeriodsType } from '@/atoms/periodAtom';
import { Union } from 'types';
import { orderSelectOptions } from './tourism.constants';

export type orderSelectOptionsValues = Union<typeof orderSelectOptions>;
export type orderSelectOptionsKeys = keyof typeof orderSelectOptions;
