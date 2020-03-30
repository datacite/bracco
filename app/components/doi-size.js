import Component from '@ember/component';
// import { set } from '@ember/object';

export default Component.extend({

  actions: {
    updateSize(value) {
      this.set('fragment', value);
    },
    selectSize() {
      console.log(this.fragment);
      this.model.get('sizes').replace(this.index, 1, [ this.fragment ]);
    },
    deleteSize() {
      this.model.get('sizes').removeAt(this.index);
    },
  },
});
