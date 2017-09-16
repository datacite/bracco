import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  tagName: 'div',
  classNames: ['row'],
  client: null,
  new: false,

  reset() {
    this.set('client', null);
    this.set('new', false);
  },

  actions: {
    new: function(model) {
      let provider = this.get('store').peekRecord('provider', model.get('otherParams.provider-id'));
      this.set('client', this.get('store').createRecord('client', { provider: provider, id: provider.id + '.', domains: '*', isActive: true }));
      this.set('new', true);
    },
    submit: function(client) {
      let self = this;
      client.save().then(function(client) {
        self.get('router').transitionTo('clients.show.prefixes', client.id);
        self.set('new', false);
      });
    },
    cancel: function() {
      this.get('client').deleteRecord();
      this.reset();
    }
  }
});
