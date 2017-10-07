import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  tagName: 'div',
  classNames: ['row'],
  client: null,
  new: false,
  repository: null,
  repositories: [],

  selectRepository(repository) {
    this.set('repository', repository)
    this.get('client').set('repository', repository);
    this.get('client').set('name', this.get('repository').get('name'));
  },
  reset() {
    this.set('client', null);
    this.set('new', false);
  },

  actions: {
    new: function(model) {
      let provider = this.get('store').peekRecord('provider', model.get('otherParams.provider-id'));
      this.set('client', this.get('store').createRecord('client', { provider: provider, id: provider.id + '.' }));
      this.set('new', true);
    },
    searchRepository(query) {
      this.set('repositories', this.get('store').query('repository', { 'query': query, 'page[size]': 10 }));
    },
    selectRepository(repository) {
      this.selectRepository(repository);
    },
    submit: function(client) {
      let self = this;
      client.save().then(function(client) {
        self.get('router').transitionTo('clients.show.settings', client.id);
        self.set('new', false);
      });
    },
    cancel: function() {
      this.get('client').deleteRecord();
      this.reset();
    }
  }
});
