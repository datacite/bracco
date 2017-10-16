import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  confirmId: validator('confirmation', {
    on: 'symbol',
    message: 'Client ID does not match'
  })
});

export default Ember.Component.extend(Validations, {
  store: Ember.inject.service(),

  edit: false,
  delete: false,
  client: null,
  confirmName: null,
  repository: null,
  repositories: [],

  reset() {
    this.set('client', null);
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
    destroy: function(client) {
      if (this.get('confirmId') === client.get('symbol')) {
        client.destroyRecord();
        this.get('router').transitionTo('/clients');
      }
    },
    cancel: function() {
      this.reset();
    }
  }
});
