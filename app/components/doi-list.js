import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'div',
  classNames: [ 'row' ],
  isPerson: computed(function() {
    return this.attrs.link == 'users.show.dois';
  }),
});
