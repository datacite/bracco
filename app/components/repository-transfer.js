import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { classNames, tagName } from '@ember-decorators/component';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

@classic
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

  init(...args) {
    super.init(...args);

    this.providers = this.providers || [];
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);
    this.model.set('mode', 'transfer');
    this.searchProvider(null);
  }

  searchProvider(query) {
    let self = this;
    if (this.currentUser.get('isAdmin')) {
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
    } else if (this.currentUser.get('isConsortium')) {
      this.store
        .query('provider', {
          query,
          'consortium-id': this.currentUser.get('provider_id'),
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
    this.set('provider', provider);
    this.set('isDisabled', false);
    this.model.set('targetId', provider.uid);
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
    let count = this.model.get('meta.doiCount');
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
  canceAction() {
    this.router.transitionTo('repositories.show', this.model);
  }
}
