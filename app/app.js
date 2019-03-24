import Application from '@ember/application';
import './models/custom-inflector-rules';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';
import * as Sentry from '@sentry/browser';

Sentry.init({ 
  dsn: config.SENTRY_DSN,
  release: config.APP_NAME + ':' + config.VERSION,
  integrations: [new Sentry.Integrations.Ember()]
});

const App = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
