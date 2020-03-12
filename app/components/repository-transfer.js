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
  repositories: [],
  isDisabled: true,

  didReceiveAttrs() {
    this._super(...arguments);

    this.searchRepository(null);
  },

  searchRepository(query) {
    if (this.currentUser.get('isAdmin')) {
      this.set('repositories', this.store.query('repository', { query, sort: 'name', 'page[size]': 100 }));
    } else if (this.currentUser.get('isProvider')) {
      this.set('repositories', this.store.query('repository', { query, 'provider-id': this.currentUser.get('provider_id'), sort: 'name', 'page[size]': 100 }));
    }
  },
  selectRepository(repository) {
    this.set('repository', repository);
    this.set('isDisabled', (repository === null) || (repository.id === this.get('model.id')));
    this.model.set('targetId', repository.id);
  },

  actions: {
    searchRepository(query) {
      this.searchRepository(query);
    },
    selectRepository(repository) {
      this.selectRepository(repository);
    },
    submit() {
      this.model.save();
      let count = this.model.get('totalDoiCount');
      this.flashMessages.success('DOI transfer for ' + this.intl.formatNumber(count) + ' DOIs started, the transfer should take about ' + this.intl.formatNumber(Math.ceil(count / 5000) + 1) + ' minutes to complete.', {
        timeout: 5000,
        sticky: true,
      });
      this.router.transitionTo('repositories.show', this.model);
    },
    cancel() {
      this.router.transitionTo('repositories.show.dois', this.model);
    },
  },
});
