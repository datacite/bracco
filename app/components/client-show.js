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
    if (repository) {
      let self = this;
      this.get('store').findRecord('repository', repository.id).then(function(repo) {
        self.set('repository', repo)
        self.get('client').set('repository', repo);
        self.get('client').set('name', repo.get('name'));
        self.get('client').set('contactEmail', repo.get('repositoryContact'));
      });
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
