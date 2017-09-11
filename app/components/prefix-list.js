import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  tagName: 'div',
  classNames: ['row'],
  prefix: null,
  client: null,
  provider: null,
  parent: null,
  new: false,
  attach: false,
  detach: false,
  prefixes: [],

  setProvider(providerId) {
    this.set('provider', this.get('store').findRecord('provider', providerId));
    this.set('parent', this.get('provider'));
  },
  setClient(clientId) {
    this.set('client', this.get('store').findRecord('client', clientId));
    this.set('parent', this.get('client'));
  },
  addClient(client, prefix) {
    prefix.get('clients').pushObject(client);
    prefix.save();
  },
  addProvider(provider, prefix) {
    prefix.get('providers').pushObject(provider);
    prefix.save();
  },
  removeClient(client, prefix) {
    prefix.get('clients').removeObject(client);
    prefix.save();
    // prefix.save().catch(function() {
    //   let errors = prefix.get('errors');
    //   //console.log(errors);
    // });
  },
  removeProvider(provider, prefix) {
    prefix.get('providers').removeObject(provider);
    prefix.save();
  },

  actions: {
    new: function() {
      this.set('new', true);
    },
    attach: function(model) {
      this.set('prefix', this.get('store').createRecord('prefix'));

      if (model.content.query['provider-id']) {
        this.setProvider(model.content.query['provider-id']);
      } else if (model.content.query['client-id']) {
        this.setClient(model.content.query['client-id']);
      }
      this.set('attach', true);
    },
    detach: function(prefix, model) {
      this.set('prefix', prefix);

      if (model.content.query['provider-id']) {
        this.setProvider(model.content.query['provider-id']);
      } else if (model.content.query['client-id']) {
        this.setClient(model.content.query['client-id']);
      }
      this.set('detach', true);
    },
    submit: function() {
      if (this.get('client')) {
        this.addClient(this.get('client'), this.get('prefix'));
      } else if (this.get('provider')) {
        this.addProvider(this.get('provider'), this.get('prefix'));
      }
      this.sendAction('refreshCurrentRoute');
      this.set('new', false);
    },
    destroy: function() {
      if (this.get('client')) {
        this.removeClient(this.get('client'), this.get('prefix'));
      } else if (this.get('provider')) {
        this.removeProvider(this.get('provider'), this.get('prefix'));
      }
      this.sendAction('refreshCurrentRoute');
      this.set('detach', false);
    },
    cancel: function() {
      this.set('new', false);
      this.set('attach', false);
      this.set('detach', false);
    },
    searchPrefix: function(query) {
      this.set('prefixes', this.get('store').query('prefix', { query: query, 'page[size]': 10 }));
    },
    selectPrefix(prefix) {
      this.set('prefix', prefix);
    },
  }
});
