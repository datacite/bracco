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
    this.route('show', { path: '/:member_id' });
    this.route('edit', { path: '/:member_id/edit' });
  });
  this.route('data-centers', function() {
    this.route('new');
    this.route('show', { path: '/:data_center_id' });
    this.route('edit', { path: '/:data_center_id/edit' });
  });
  this.route('works', function() {
    this.route('new');
    this.route('show', { path: '/:work_id' });
    this.route('edit', { path: '/:work_id/edit' });
  });
  this.route('settings');
  this.route('status');
  this.route('users', function() {
    this.route('edit', { path: '/:user_id/edit' });
  });
});

export default Router;
