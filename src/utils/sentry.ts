import * as Sentry from "@sentry/node";

export default (dsn: string) => {
	return Sentry.init({
		dsn,
		tracesSampleRate: 1.0,
	});
};
