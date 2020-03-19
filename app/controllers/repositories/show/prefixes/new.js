import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  store: service(),
  'provider-prefixes': [],

  actions: {
    searchPrefix(query) {
      this.set('provider-prefixes', this.store.query('provider-prefix', { query, 'provider-id': this.model.repository.get('provider.id'), state: 'without-repository', sort: 'name', 'page[size]': 25 }));
    },
    selectPrefix(providerPrefix) {
      this.model['repository-prefix'].set('provider-prefix', providerPrefix);
      this.model['repository-prefix'].set('prefix', providerPrefix.get('prefix'));
    },
    submit() {
      let self = this;
      this.model['repository-prefix'].save().then(function(repositoryPrefix) {
        self.transitionToRoute('repositories.show.prefixes', repositoryPrefix.get('repository').get('id'));
      }).catch(function(reason) {
        console.debug(reason);
      });
    },
    cancel() {
      this.transitionToRoute('repositories.show.prefixes', this.get('model.repository'));
    },
  },
});