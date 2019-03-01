import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  actions: {
    updateTitle(value) {
      this.fragment.set('title', value);
    },
    deleteTitle() {
      this.model.get('titles').removeObject(this.fragment);
    }
  }
});
