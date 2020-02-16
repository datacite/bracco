import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  can: service(),
  tagName: 'div',
  classNames: [ 'row' ],
  isResearcherProfile: computed(function() {
    if (this.data == undefined) {return false; }
    if (this.attrs.link == 'users.show.dois') {
      return true;
    } else {
      return false;
    }
  }),
});
