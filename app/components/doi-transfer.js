import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  currentUser: service(),
  store: service(),
  router: service(),

  oldRepository: null,
  repositories: null,
  isDisabled: true,

  didReceiveAttrs() {
    this._super(...arguments);

    this.model.set('mode', 'transfer');

    this.searchRepository(null);
  },

  searchRepository(query) {
    let self = this;
    if (self.isDestroying || self.isDestroyed) {
      return;
    }
    if (this.currentUser.get('isAdmin')) {
      this.store
        .query('repository', { query, sort: 'name', 'page[size]': 100 })
        .then(function (repositories) {
          self.set('repositories', repositories);
        })
        .catch(function (reason) {
          console.debug(reason);
          self.set('repositories', []);
        });
    } else if (this.currentUser.get('isConsortium')) {
      this.store
        .query('repository', {
          query,
          'consortium-id': this.currentUser.get('provider_id'),
          sort: 'name',
          'page[size]': 100
        })
        .then(function (repositories) {
          self.set('repositories', repositories);
        })
        .catch(function (reason) {
          console.debug(reason);
          self.set('repositories', []);
        });
    } else if (this.currentUser.get('isProvider')) {
      this.store
        .query('repository', {
          query,
          'provider-id': this.currentUser.get('provider_id'),
          sort: 'name',
          'page[size]': 100
        })
        .then(function (repositories) {
          self.set('repositories', repositories);
        })
        .catch(function (reason) {
          console.debug(reason);
          self.set('repositories', []);
        });
    }
  },
  selectRepository(repository) {
    this.set('oldRepository', this.model.get('repository.id'));
    this.model.set('repository', repository);
    this.model.set('provider', repository.get('provider'));
    this.set('isDisabled', repository.id === this.oldRepository);
  },

  actions: {
    searchRepository(query) {
      this.searchRepository(query);
    },
    selectRepository(repository) {
      this.selectRepository(repository);
    },
    submit(doi) {
      let self = this;
      doi.save().then(function (doi) {
        self.router.transitionTo('dois.show', doi);
      });
    },
    cancel() {
      this.router.transitionTo('dois.show', this.model);
    }
  }
});
