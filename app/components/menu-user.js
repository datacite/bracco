import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Component.extend({
  session: service(),
  currentUser: service(),

  settings: null,

  tagName: 'li',
  classNameBindings: ['dropdownMenu'],
  dropdownMenu: Ember.computed(function() {
    this.get('session').get('isAuthenticated');
  }),

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  },
  didInsertElement() {
    let settings = this.get('currentUser').get('settings');
    if (Ember.typeOf(settings) == 'object') {
      this.set('settings', { route: settings.route, model: settings.id });
    } else if (settings) {
      this.set('settings', { href: settings });
    } else {
      this.set('settings', null);
    }
  }
});
