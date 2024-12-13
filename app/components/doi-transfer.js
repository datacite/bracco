// Finish conversion of this component to a @glimmer component.
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';

export default class DoiTransfer extends Component {
  @service
  currentUser;

  @service
  store;

  @service
  router;

  oldRepository = null;
  repositories = null;
  isDisabled = true;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    this.model.mode = 'transfer';

    this.searchRepository(null);
  }

  searchRepository(query) {
    let self = this;
    if (self.isDestroying || self.isDestroyed) {
      return;
    }
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
  }

  selectRepository(repository) {
    // Fix to enambe/disable  the 'Transfer' button appropriatly.
    // (I.e., don't try and transfer a doi to it's current repository.)
    if (this.oldRepository === null) {
      this.oldRepository = this.model.repository.get('id');
    }
    this.model.repository = repository;
    this.model.provider = repository.get('provider');
    this.set('isDisabled', repository.get('id') === this.oldRepository);
  }

  @action
  searchRepositoryAction(query) {
    this.searchRepository(query);
  }

  @action
  selectRepositoryAction(repository) {
    this.selectRepository(repository);
  }

  @action
  submitAction(doi) {
    let self = this;
    doi.save().then(function (doi) {
      self.router.transitionTo('dois.show', doi);
    });
  }

  @action
  cancelAction() {
    this.router.transitionTo('dois.show', this.model);
  }
}
