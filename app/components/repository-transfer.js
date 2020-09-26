import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  currentUser: service(),
  store: service(),
  flashMessages: service(),
  intl: service(),

  tagName: 'div',
  classNames: [ 'row' ],
  provider: null,
  repository: null,
  providers: [],
  isDisabled: true,

  didReceiveAttrs() {
    this._super(...arguments);
    this.model.set('mode', 'transfer');
    this.searchProvider(null);
  },

  searchProvider(query) {
    let self = this;
    if (this.currentUser.get('isAdmin')) {
      this.store.query('provider', { query, sort: 'name', 'member-type': 'direct_member,consortium_organization', 'page[size]': 100 }).then(function(providers) {
        self.set('providers', providers);
      }).catch(function(reason) {
        console.debug(reason);
        self.set('providers', []);
      });
    } else if (this.currentUser.get('isConsortium')) {
      this.store.query('provider', { query, 'consortium-id': this.currentUser.get('provider_id'), sort: 'name', 'member-type': 'consortium_organization', 'page[size]': 100 }).then(function(providers) {
        self.set('providers', providers);
      }).catch(function(reason) {
        console.debug(reason);
        self.set('providers', []);
      });
    }
  },
  selectProvider(provider) {
    this.set('provider', provider);
    this.set('isDisabled', false);
    this.model.set('targetId', provider.uid);
  },

  actions: {
    searchProvider(query) {
      this.searchProvider(query);
    },
    selectProvider(provider) {
      this.selectProvider(provider);
    },
    submit() {
      this.model.save();
      let count = this.model.get('meta.doiCount');
      this.flashMessages.success('DOI transfer for ' + this.intl.formatNumber(count) + ' DOIs started, the transfer should take about ' + this.intl.formatNumber(Math.ceil(count / 5000) + 1) + ' minutes to complete.', {
        timeout: 5000,
        sticky: true,
      });
      this.router.transitionTo('repositories.show', this.model);
    },
    cancel() {
      this.router.transitionTo('repositories.show', this.model);
    },
  },
});
