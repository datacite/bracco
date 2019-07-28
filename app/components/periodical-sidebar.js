import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  currentUser: service(),

  classNames: ['panel', 'facets', 'add'],

  didInsertElement() {
    this.set('currentUser', this.currentUser);
  }
});
