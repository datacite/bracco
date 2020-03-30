import Component from '@ember/component';
import { set } from '@ember/object';

export default Component.extend({


  actions: {
    updateFormat(value) {
      set(this, 'fragment', value);
    },
    deleteFormat() {
      this.model.get('formats').removeObject(this.fragment);
    },
  },
});
