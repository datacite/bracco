import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  currentUser: service(),
  store: service(),

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
    if (this.currentUser.isAdmin) {
      this.store
        .query('repository', { query, sort: 'name', 'page[size]': 100 })
        .then(function (repositories) {
          self.set('repositories', repositories);
        })
        .catch(function (reason) {
          console.debug(reason);
          self.set('repositories', []);
        });
    } else if (this.currentUser.isConsortium) {
      this.store
        .query('repository', {
          query,
          'consortium-id': this.currentUser.provider_id,
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
    } else if (this.currentUser.isProvider) {
      this.store
        .query('repository', {
          query,
          'provider-id': this.currentUser.provider_id,
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
    this.set('oldRepository', this.model.repository.id);
    this.model.set('repository', repository);
    this.model.set('provider', repository.provider);
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
