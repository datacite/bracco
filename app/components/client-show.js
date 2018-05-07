import Ember from 'ember';
import fetch from 'fetch';
const { service } = Ember.inject;
import ENV from 'bracco/config/environment';

export default Ember.Component.extend({
  currentUser: service(),
  store: service(),

  edit: false,
  change: false,
  delete: false,
  client: null,
  provider: null,
  setPassword: false,
  repository: null,
  repositories: [],

  reset() {
    this.get('client').set('passwordInput', null);
    this.set('edit', false);
    this.set('change', false);
    this.set('delete', false);
  },
  generate() {
    let self = this;
    let url = ENV.APP_URL + '/random';
    fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + this.get('currentUser').get('jwt')
      }
    }).then(function(response) {
      if (response.ok) {
        response.json().then(function(data) {
          self.get('model').set('passwordInput', data.phrase);
        });
      } else {
        Ember.Logger.assert(false, response)
      }
    }).catch(function(error) {
      Ember.Logger.assert(false, error)
    });
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
    edit(client) {
      this.set('client', client);
      this.get('client').set('confirmSymbol', client.get('symbol'));
      this.set('repository', client.get('repository'));
      this.set('edit', true);
    },
    change(client) {
      this.set('client', client);
      this.get('client').set('confirmSymbol', client.get('symbol'));
      this.set('change', true);
    },
    generate() {
      this.generate();
    },
    delete(client) {
      this.set('client', client);
      this.get('client').set('confirmSymbol', null);
      this.get('client').validateSync();
      this.set('provider', client.get('provider'));
      this.set('delete', true);
    },
    setPassword() {
      let self = this;
      this.get('client').set('keepPassword', false);
      this.get('client').save().then(function () {
        self.reset();
      }).catch(function(reason){
        Ember.Logger.assert(false, reason);
      });
    },
    searchRepository(query) {
      this.set('repositories', this.get('store').query('repository', { 'query': query, 'page[size]': 25 }));
    },
    selectRepository(repository) {
      this.selectRepository(repository);
    },
    submit(client) {
      let self = this;
      client.save().then(function () {
        self.reset();
      }).catch(function(reason){
        Ember.Logger.assert(false, reason);
      });
    },
    destroy(client) {
      let self = this;
      this.get('store').findRecord("client", client.id, { backgroundReload: false }).then(function(client) {
        client.destroyRecord().then(function () {
          self.get('router').transitionTo('providers.show.settings', self.get('provider'));
        });
      });
    },
    cancel(client) {
      this.get('model').rollbackAttributes();
      this.reset();
    },
    onSuccess() {
    },
    onError(error) {
      Ember.Logger.assert(false, error)
    }
  }
});
