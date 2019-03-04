import Component from '@ember/component';

export default Component.extend({
  actions: {
    addDescription() {
      this.model.get('descriptions').createFragment();
    }
  }
});
