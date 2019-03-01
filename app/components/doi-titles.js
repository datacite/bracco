import Component from '@ember/component';

export default Component.extend({
  actions: {
    addTitle() {
      this.model.get('titles').createFragment();
    }
  }
});
