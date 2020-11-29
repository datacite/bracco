import * as Sentry from '@sentry/browser';
import { Ember } from '@sentry/integrations/esm/ember';

import config from './config/environment';

export function startSentry() {
  Sentry.init({
    dsn: config.SENTRY_DSN,
    release: config.APP_NAME + ':' + config.VERSION,
    integrations: [new Ember()],
    ignoreErrors: ['TransitionAborted']
  });
}
