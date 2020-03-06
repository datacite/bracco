import Component from '@ember/component';

export default Component.extend({
  validationClass: null,

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model.get('subjects')) {
      this.model.set('subjects', []);
    }
    if (this.model.get('subjects').length == 0) {
      this.model.get('subjects').createFragment();
    }
  },

  actions: {
    addSubject() {
      this.model.get('subjects').createFragment();
    },
  },
});
