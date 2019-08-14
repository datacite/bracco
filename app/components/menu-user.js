import { typeOf } from '@ember/utils';
import { computed } from '@ember/object';
import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  session: service(),
  currentUser: service(),

  settings: null,

  tagName: 'li',
  classNameBindings: ['dropdownMenu'],
  dropdownMenu: computed(function() {
    this.session.get('isAuthenticated');
  }),

  didReceiveAttrs() {
    this._super(...arguments);
    
    let settings = this.currentUser.get('settings');
    if (typeOf(settings) == 'object') {
      this.set('settings', { route: settings.route, model: settings.id });
    } else if (settings) {
      this.set('settings', { href: settings });
    } else {
      this.set('settings', null);
    }
  },

  actions: {
    invalidateSession() {
      this.session.invalidate();
    }
  }
});
