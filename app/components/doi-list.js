import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import ENV from 'bracco/config/environment';
import { reads } from '@ember/object/computed';

export default Component.extend({
  can: service(),
  router: service(),
  tagName: 'div',
  classNames: ['row'],
  isResearcherProfile: computed('data', 'link', function () {
    if (this.data == undefined) {
      return false;
    }
    if (this.link == 'users.show.dois') {
      return true;
    } else {
      return false;
    }
  })
});
