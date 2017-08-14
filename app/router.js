import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function() {
  this.route('members', function() {
    this.route('show', { path: '/:member_id' });
  });
  this.route('data-centers', function() {
    this.route('show', { path: '/:data_center_id' });
  });
  this.route('settings');
  this.route('status');
  this.route('users');
});

export default Router;
