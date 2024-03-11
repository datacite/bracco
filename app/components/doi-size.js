import Component from '@ember/component';

export default Component.extend({
  actions: {
    updateSize(value) {
      this.set('fragment', value);
    },
    selectSize() {
      this.model.get('sizes').splice(this.index, 1, this.fragment);
      this.model.set('sizes', Array.from(this.model.get('sizes')));
    },
    deleteSize() {
      this.model.get('sizes').splice(this.index, 1);
      this.model.set('sizes', Array.from(this.model.get('sizes')));
    }
  }
});
