import Component from '@ember/component';

export default Component.extend({
  validationClass: null,

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model.get('subjects')) {
      this.model.set('subjects', []);
    }
  },

  actions: {
    addSubject() {
      this.model.get('subjects').createFragment();
    },
  },
});
