import path from 'path';

import * as Sentry from '@sentry/nestjs';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import dotenv from 'dotenv';

import { ENV_SENTRY_DNS_KEY } from '@/constants/env-keys.const';

dotenv.config({
	path: path.resolve(
		process.env.NODE_ENV === 'production'
			? '.production.env'
			: process.env.NODE_ENV === 'stage'
			? '.stage.env'
			: '.development.env',
	),
});

Sentry.init({
	dsn: process.env[ENV_SENTRY_DNS_KEY],
	integrations: [nodeProfilingIntegration()],
	// Tracing
	tracesSampleRate: 1.0, //  Capture 100% of the transactions

	// Set sampling rate for profiling - this is relative to tracesSampleRate
	profilesSampleRate: 1.0,
});
