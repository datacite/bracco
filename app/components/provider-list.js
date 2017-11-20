import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  tagName: 'div',
  classNames: ['row'],
  provider: null,
  new: false,

  reset() {
    this.set('provider', null);
    this.set('new', false);
  },

  actions: {
    new: function() {
      this.set('provider', this.get('store').createRecord('provider', { isActive: true }));
      this.set('new', true);
    },
    submit: function(provider) {
      let self = this;
      provider.save().then(function(provider) {
        self.get('router').transitionTo('providers.show.settings', provider.id);
        self.set('new', false);
      }).catch(function(reason){
        Ember.Logger.assert(false, reason);
      });
    },
    cancel: function() {
      this.get('provider').deleteRecord();
      this.reset();
    }
  }
});
