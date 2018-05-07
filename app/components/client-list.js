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
  reset() {
    this.set('client', null);
    this.set('new', false);
  },

  actions: {
    new(model) {
      let provider = this.get('store').peekRecord('provider', model.get('otherParams.provider-id'));
      this.set('client', this.get('store').createRecord('client', { provider: provider, symbol: provider.id.toUpperCase() + '.' }));
      this.set('new', true);
    },
    searchRepository(query) {
      this.set('repositories', this.get('store').query('repository', { 'query': query, 'page[size]': 25 }));
    },
    selectRepository(repository) {
      this.selectRepository(repository);
    },
    submit(client) {
      let self = this;
      client.save().then(function(client) {
        self.get('router').transitionTo('clients.show.settings', client.id);
        self.set('new', false);
      }).catch(function(reason){
        Ember.Logger.assert(false, reason);
      });
    },
    cancel() {
      this.get('client').rollbackAttributes();
      this.reset();
    }
  }
});
