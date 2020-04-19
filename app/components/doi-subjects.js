import Component from '@ember/component';

export default Component.extend({
  showSubjects: false,

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model.get('subjects')) {
      this.model.set('subjects', []);
    }
  },

  actions: {
    addSubject() {
      this.model.get('subjects').createFragment();
      this.set('showSubjects', true);
    },
    toggleSubjects() {
      this.set('showSubjects', !this.get('showSubjects'));
    },
  },
});
