import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import GoogleAnalyticsRoute from 'ember-tracker/mixins/google-analytics-route';

const Router = EmberRouter.extend(GoogleAnalyticsRoute, {
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function() {
  this.route('providers', function() {
    this.route('show', { path: '/:provider_id' }, function() {
      this.route('edit');
      this.route('change');
      this.route('delete');
      this.route('settings');
      this.route('dois');
      this.route('prefixes', function() {
        this.route('show', { path: '/:prefix_id' }, function() {
          this.route('delete');
        });
        this.route('new');
      });
      this.route('organizations', function() {
        this.route('new');
      });
      this.route('repositories', function() {
        this.route('new');
      });
    });
    this.route('new');
  });
  this.route('repositories', function() {
    this.route('show', { path: '/:repository_id' }, function() {
      this.route('edit');
      this.route('change');
      this.route('delete');
      this.route('settings');
      this.route('dois', function() {
        this.route('new');
        this.route('upload');
      });
      this.route('transfer');
      this.route('prefixes', function() {
        this.route('show', { path: '/:prefix_id' }, function() {
          this.route('delete');
        });
        this.route('new');
      });
    });
    this.route('new');
  });
  this.route('dois', function() {
    this.route('show', { path: '/:doi_id' }, function() {
      this.route('edit');
      this.route('modify');
      this.route('delete');
      this.route('transfer');
    });
  });
  this.route('prefixes', function() {
    this.route('new');
  });
  this.route('users', function() {
    this.route('show', { path: '/:user_id' }, function() {
      this.route('settings');
      this.route('dois');
    });
  });
  this.route('settings', function() {
    this.route('index', { path: '/' });
    this.route('edit');
    this.route('change');
  });
  this.route('sign-in');
  this.route('authorize');
  this.route('reset');
  this.route('password');

  // set up all of your known routes, and then...
  this.route('404', { path: '*path' });
});

export default Router;
