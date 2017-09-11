import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  
  tagName: 'div',
  classNames: ['row'],
  new: false,
  doi: null,

  actions: {
    new: function() {
      this.set('doi', this.get('store').createRecord('doi'));
      this.set('new', true);
    },
    submit: function(doi) {
      doi.save();
      this.set('new', false);
    },
    cancel: function() {
      this.set('new', false);
    }
  }
});
