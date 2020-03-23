import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  store: service(),
  'provider-prefixes': [],
  disabled: true,

  searchPrefix(query) {
    this.set('provider-prefixes', this.store.query('provider-prefix', { query, 'provider-id': this.model.repository.get('provider.id'), state: 'without-repository', sort: 'name', 'page[size]': 10 }));
  },

  actions: {
    searchPrefix(query) {
      this.searchPrefix(query);
    },
    selectPrefix(providerPrefix) {
      this.model['repository-prefix'].set('provider-prefix', providerPrefix);
      this.model['repository-prefix'].set('prefix', providerPrefix.get('prefix'));
      this.set('disabled', false);
    },
    submit() {
      if (this.model['repository-prefix'].get('provider-prefix')) {
        let self = this;
        this.model['repository-prefix'].save().then(function(repositoryPrefix) {
          self.set('disabled', true);
          self.transitionToRoute('repositories.show.prefixes', repositoryPrefix.get('repository.id'));
        }).catch(function(reason) {
          console.debug(reason);
        });
      } else {
        this.transitionToRoute('repositories.show.prefixes', this.get('model.repository'));
      }
    },
    cancel() {
      this.model['repository-prefix'].set('provider-prefix', null);
      this.model['repository-prefix'].set('prefix', null);
      this.set('disabled', true);
      this.transitionToRoute('repositories.show.prefixes', this.get('model.repository'));
    },
  },
});