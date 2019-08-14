import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  currentUser: service(),

  classNames: ['panel', 'facets', 'add'],

  didReceiveAttrs() {
    this._super(...arguments);
    
    this.set('currentUser', this.currentUser);
  }
});
