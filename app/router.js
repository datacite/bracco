import Ember from 'ember';
import config from './config/environment';
import GoogleAnalyticsRoute from 'ember-tracker/mixins/google-analytics-route';

const Router = Ember.Router.extend(GoogleAnalyticsRoute, {
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function() {
  this.route('members', function() {
    this.route('new');
    this.route('show', { path: '/:member_id' }, function() {
      this.route('works', { path: '/works' });
      this.route('prefixes', { path: '/prefixes' });
      this.route('users', { path: '/users' });
      this.route('data-centers', { path: '/data-centers' });
    });
  });
  this.route('data-centers', function() {
    this.route('new');
    this.route('edit', { path: '/:data_center_id/edit' });
    this.route('show', { path: '/:data_center_id' }, function() {
      this.route('works', { path: '/works' });
      this.route('prefixes', { path: '/prefixes' });
      this.route('users', { path: '/users' });
    });
  });
  this.route('works', function() {
    this.route('new');
    this.route('show', { path: '/:work_id' });
    this.route('edit', { path: '/:work_id/edit' });
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
