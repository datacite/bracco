import Ember from 'ember';
import config from './config/environment';
import GoogleAnalyticsRoute from 'ember-tracker/mixins/google-analytics-route';

const Router = Ember.Router.extend(GoogleAnalyticsRoute, {
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function() {
  this.route('providers', function() {
    this.route('new');
    this.route('show', { path: '/:provider_id' }, function() {
      this.route('dois', { path: '/dois' });
      this.route('prefixes', { path: '/prefixes' });
      this.route('users', { path: '/users' });
      this.route('clients', { path: '/clients' });
    });
  });
  this.route('clients', function() {
    this.route('new');
    this.route('edit', { path: '/:client_id/edit' });
    this.route('show', { path: '/:client_id' }, function() {
      this.route('dois', { path: '/dois' });
      this.route('prefixes', { path: '/prefixes' });
      this.route('users', { path: '/users' });
    });
  });
  this.route('dois', function() {
    this.route('new');
    this.route('show', { path: '/:doi_id' });
    this.route('edit', { path: '/:doi_id/edit' });
  });
  this.route('settings');
  this.route('users', function() {
    this.route('edit', { path: '/:user_id/edit' });
  });
  this.route('prefixes', function() {
    this.route('show', { path: '/:prefix_id' });
  });
});

export default Router;
