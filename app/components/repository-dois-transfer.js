// Finish conversion of this component to a @glimmer component.
import { action } from '@ember/object';
import { classNames, tagName } from '@ember-decorators/component';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';

@tagName('div')
@classNames('row')
export default class RepositoryDoisTransfer extends Component {
  @service
  currentUser;

  @service
  store;

  @service
  flashMessages;

  @service
  intl;

  @service
  router;

  provider = null;
  repository = null;
  isDisabled = true;

  constructor(...args) {
    super(...args);

    this.repositories = this.repositories || [];
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    this.searchRepository(null);
  }

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
  }

  selectRepository(repository) {
    this.set('repository', repository);
    this.set(
      'isDisabled',
      repository === null || repository.id === this.model.id
    );
    if (repository !== null) {
      this.model.set('targetId', repository.id);
    }
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
  submitAction() {
    this.model.save();
    let count = this.model.meta.doiCount;
    this.flashMessages.success(
      'DOI transfer for ' +
        this.intl.formatNumber(count) +
        ' DOIs started, the transfer should take about ' +
        this.intl.formatNumber(Math.ceil(count / 5000) + 1) +
        ' minutes to complete.',
      {
        timeout: 5000,
        sticky: true
      }
    );
    this.router.transitionTo('repositories.show', this.model);
  }

  @action
  cancelAction() {
    this.router.transitionTo('repositories.show.dois', this.model);
  }
}
