import Component from '@ember/component';

export default Component.extend({

  actions: {
    updateFormat(value) {
      this.set('fragment', value);
    },
    selectFormat() {
      this.model.get('formats').replace(this.index, 1, [ this.fragment ]);
    },
    deleteFormat() {
      this.model.get('formats').removeAt(this.index);
    },
  },
});
