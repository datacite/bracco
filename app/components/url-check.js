import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Component.extend({
  currentUser: service(),

  didInsertElement() {
    this.set('url', this.get('url'));
  }
});
