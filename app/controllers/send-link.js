import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Controller.extend({
  session: service(),

  actions: {
    sendLink() {
    }
  }
});
