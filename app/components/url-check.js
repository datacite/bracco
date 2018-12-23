import Ember from 'ember';
const { service } = Ember.inject;
import fetch from 'fetch';
import ENV from 'bracco/config/environment';

export default Ember.Component.extend({
  currentUser: service(),

  didInsertElement() {
    this.set('url', this.get('url'));
  }
});
