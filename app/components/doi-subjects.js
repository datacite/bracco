import Component from '@ember/component';

export default Component.extend({
  showSubjects: false,

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model.subjects) {
      this.model.set('subjects', []);
    }
  },

  actions: {
    addSubject() {
      this.model.subjects.createFragment();
      this.set('showSubjects', true);
    },
    toggleSubjects() {
      this.set('showSubjects', !this.showSubjects);
    }
  }
});
