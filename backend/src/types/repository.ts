import { DeepPartial } from 'typeorm';

export type OverrideInsertFeild<T> = DeepPartial<T>;

export type OverrideInsertArrayFeild<T> = DeepPartial<T>[];
