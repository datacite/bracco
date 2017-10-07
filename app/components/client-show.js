import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  edit: false,
  delete: false,
  client: null,
  repository: null,
  repositories: [],

  reset() {
    this.set('client', null);
    this.set('edit', false);
  },
  selectRepository(repository) {
    this.set('repository', repository)
    this.get('client').set('repository', repository);
    if (repository) {
      this.get('client').set('name', this.get('repository').get('name'));
    }
  },

  actions: {
    edit: function(client) {
      this.set('client', client);
      this.set('repository', client.get('repository'));
      this.set('edit', true);
    },
    delete: function(client) {
      this.set('client', client);
      this.set('delete', true);
    },
    searchRepository(query) {
      this.set('repositories', this.get('store').query('repository', { 'query': query, 'page[size]': 10 }));
    },
    selectRepository(repository) {
      this.selectRepository(repository);
    },
    submit: function(client) {
      client.save();
      this.reset();
    },
    destroy: function(link) {
      this.get('client').destroyRecord();
      this.set('edit', false);
      this.get('router').transitionTo(link);
    },
    cancel: function() {
      this.reset();
      this.set('delete', false);
    }
  }
});
