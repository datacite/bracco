import Component from '@ember/component';
// import { set } from '@ember/object';

export default Component.extend({
  actions: {
    updateSize(value) {
      this.set('fragment', value);
    },
    selectSize() {
      this.model.sizes.replace(this.index, 1, [this.fragment]);
    },
    deleteSize() {
      this.model.sizes.removeAt(this.index);
    }
  }
});
