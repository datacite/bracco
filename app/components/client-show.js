import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  edit: false,
  delete: false,
  client: null,
  provider: null,
  setPassword: false,
  repository: null,
  repositories: [],

  reset() {
    this.set('edit', false);
    this.set('delete', false);
  },
  selectRepository(repository) {
    if (repository) {
      let self = this;
      this.get('store').findRecord('repository', repository.id).then(function(repo) {
        self.set('repository', repo)
        self.get('client').set('repository', repo);
        self.get('client').set('name', repo.get('name'));
      });
    } else {
      this.get('client').set('repository', null);
    }
  },

  actions: {
    edit: function(client) {
      this.set('client', client);
      this.get('client').set('confirmSymbol', client.get('symbol'));
      this.get('client').set('setPassword', false);
      this.set('repository', client.get('repository'));
      this.set('edit', true);
    },
    delete: function(client) {
      this.set('client', client);
      this.get('client').set('confirmSymbol', null);
      this.get('client').validateSync();
      this.set('provider', client.get('provider'));
      this.set('delete', true);
    },
    searchRepository(query) {
      this.set('repositories', this.get('store').query('repository', { 'query': query, 'page[size]': 25 }));
    },
    selectRepository(repository) {
      this.selectRepository(repository);
    },
    submit: function(client) {
      let self = this;
      client.save().then(function () {
        self.reset();
      }).catch(function(reason){
        Ember.Logger.assert(false, reason);
      });
    },
    destroy: function(client) {
      let self = this;
      this.get('store').findRecord("client", client.id, { backgroundReload: false }).then(function(client) {
        client.destroyRecord();
        self.get('router').transitionTo('providers.show.settings', self.get('provider'));
      });
    },
    cancel: function(client) {
      let self = this;
      this.get('store').findRecord("client", client.id).then(function(client) {
        self.get('model').set('client', client);
        self.reset();
      });
    }
  }
});
