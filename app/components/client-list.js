import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  tagName: 'div',
  classNames: ['row'],
  client: null,
  new: false,

  actions: {
    new: function(model) {
      let provider = this.get('store').peekRecord('provider', model.get('otherParams.provider-id'));
      this.set('client', this.get('store').createRecord('client', { provider: provider, id: provider.id + '.', domains: '*', isActive: true }));
      this.set('new', true);
    },
    submit: function(client) {
      client.save();
      this.set('new', false);
    },
    cancel: function() {
      this.get('client').deleteRecord();
      this.set('client', null);
      this.set('new', false);
    }
  }
});
