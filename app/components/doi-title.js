import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  firstItem: computed('index', function () {
    return this.get('index') == 0;
  }),
  lastItem: computed('index', 'model.titles.length', function () {
    return this.get('index') + 1 == this.get('model.titles.length');
  }),

  actions: {
    updateTitle(value) {
      this.fragment.set('title', value);
    },
    addTitle() {
      this.model.get('titles').createFragment();
    },
    deleteTitle() {
      this.model.get('titles').removeObject(this.fragment);
    }
  }
});
