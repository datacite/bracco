import Component from '@ember/component';
// import { set } from '@ember/object';

export default Component.extend({

  updateSize(size) {
    this.set('fragment', size);
  },
  actions: {
    updateSize(value) {
      // let self = this.get('fragment').objectAt(0);
      console.log(value);
      console.log('ALPHA');
      console.log(this.fragment);
      console.log(this.attrs);
      console.log(this.attributeBindings);
      // set(this, 'fragment', value);
      // this.fragment = value;
      // this.fragment.set(value);
      // this.set('fragment', value);
      this.updateSize(value);
    },
    deleteSize() {
      this.model.get('sizes').removeObject(this.fragment);
    },
  },
});
