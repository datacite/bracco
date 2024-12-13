// Finish conversion of this component to a @glimmer component.
import { action } from '@ember/object';
import { classNames, tagName } from '@ember-decorators/component';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';

@tagName('div')
@classNames('row')
export default class RepositoryTransfer extends Component {
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

    this.providers = this.providers || [];
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);
    this.model.mode = 'transfer';
    this.searchProvider(null);
  }

  searchProvider(query) {
    let self = this;
    if (this.currentUser.isAdmin) {
      this.store
        .query('provider', {
          query,
          sort: 'name',
          'member-type': 'direct_member,consortium_organization',
          'page[size]': 100
        })
        .then(function (providers) {
          self.set('providers', providers);
        })
        .catch(function (reason) {
          console.debug(reason);
          self.set('providers', []);
        });
    } else if (this.currentUser.isConsortium) {
      this.store
        .query('provider', {
          query,
          'consortium-id': this.currentUser.provider_id,
          sort: 'name',
          'member-type': 'consortium_organization',
          'page[size]': 100
        })
        .then(function (providers) {
          self.set('providers', providers);
        })
        .catch(function (reason) {
          console.debug(reason);
          self.set('providers', []);
        });
    }
  }

  selectProvider(provider) {
    //this.set('provider', provider);
    //this.set('isDisabled', false);
    //this.model.set('targetId', provider.uid);

    this.set('provider', provider);
    //this.provider = provider;
    this.set('isDisabled', provider === null || provider.id === this.model.provider.get('id'));
    if (provider !== null) {
      this.model.set('targetId', provider.uid);
    }
  }

  @action
  searchProviderAction(query) {
    this.searchProvider(query);
  }

  @action
  selectProviderAction(provider) {
    this.selectProvider(provider);
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
    this.router.transitionTo('repositories.show', this.model);
  }
}
