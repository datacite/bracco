import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  edit: false,
  doi: null,

  actions: {
    edit: function(doi) {
      this.set('doi', doi);
      this.set('edit', true);
    },
    submit: function() {
      //doi.save();
      this.set('edit', false);
    },
    cancel: function() {
      this.set('edit', false);
    }
  }
});
