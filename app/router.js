import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import GoogleAnalyticsRoute from 'ember-tracker/mixins/google-analytics-route';

const Router = EmberRouter.extend(GoogleAnalyticsRoute, {
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('providers', function() {
    this.route('show', { path: '/:provider_id' }, function() {
      this.route('settings');
      this.route('dois');
      this.route('prefixes');
      this.route('users');
      this.route('clients');
    });
  });
  this.route('clients', function() {
    this.route('show', { path: '/:client_id' }, function() {
      this.route('settings');
      this.route('dois');
      this.route('transfer');
      this.route('prefixes');
      this.route('users');
    });
  });
  this.route('dois', function() {
    this.route('show', { path: '/:doi_id' });
  });
  this.route('settings', function() {
    this.route('index', { path: '/' });
  });
  this.route('users', function() {
    this.route('show', { path: '/:user_id' }, function() {
      this.route('settings');
      this.route('dois');
    });
    this.route('new');
  });
  this.route('prefixes', function() {
    this.route('new');
  });
  this.route('provider-prefixes', function() {
    this.route('show', { path: '/:provider-prefix_id' });
    this.route('new');
  });
  this.route('client-prefixes', function() {
    this.route('show', { path: '/:client-prefix_id' });
    this.route('new');
  });

  //set up all of your known routes, and then...
  this.route("404", { path: "*path"});
});

export default Router;
