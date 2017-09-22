import Ember from 'ember';
import config from './config/environment';
import GoogleAnalyticsRoute from 'ember-tracker/mixins/google-analytics-route';

const Router = Ember.Router.extend(GoogleAnalyticsRoute, {
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function() {
  this.route('providers', function() {
    this.route('show', { path: '/:provider_id' }, function() {
      this.route('settings', { path: '/settings' });
      this.route('dois', { path: '/dois' });
      this.route('prefixes', { path: '/prefixes' });
      this.route('users', { path: '/users' });
      this.route('clients', { path: '/clients' });
    });
  });
  this.route('clients', function() {
    this.route('show', { path: '/:client_id' }, function() {
      this.route('settings', { path: '/settings' });
      this.route('dois', { path: '/dois' });
      this.route('prefixes', { path: '/prefixes' });
      this.route('users', { path: '/users' });
    });
  });
  this.route('dois', function() {
    this.route('show', { path: '/:doi_id' });
  });
  this.route('settings', function() {
    this.route('show', { path: '/:provider_id' });
  });
  this.route('users', function() {
    this.route('edit', { path: '/:user_id/edit' });
  });
  this.route('prefixes', function() {
    this.route('show', { path: '/:prefix_id' });
  });

  //set up all of your known routes, and then...
  this.route("404", { path: "*path"});
});

export default Router;
