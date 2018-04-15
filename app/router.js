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
      this.route('prefixes', function() {
        this.route('show', { path: '/:provider-prefix_id' });
        this.route('new');
      });
      this.route('clients');
    });
  });
  this.route('clients', function() {
    this.route('show', { path: '/:client_id' }, function() {
      this.route('settings');
      this.route('dois', function() {
        this.route('new');
        this.route('upload');
        this.route('show', { path: '/:doi_id' }, function() {
          this.route('edit');
          this.route('modify');
          this.route('delete');
          this.route('transfer');
        });
      });
      this.route('transfer');
      this.route('prefixes', function() {
        this.route('show', { path: '/:client-prefix_id' });
        this.route('new');
      });
    });
  });
  
  this.route('dois', function() {
    this.route('index', { path: '/dois' });
  });
  this.route('settings', function() {
    this.route('index', { path: '/' });
  });
  this.route('prefixes', function() {
    this.route('new');
  });

  this.route("sign-in");
  this.route("reset");
  this.route("password");

  //set up all of your known routes, and then...
  this.route("404", { path: "*path"});
});

export default Router;
