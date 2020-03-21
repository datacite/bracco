import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  store: service(),
  prefixes: [],
  disabled: true,

  searchPrefix(query) {
    this.set('prefixes', this.store.query('prefix', { query, state: 'unassigned', sort: 'name', 'page[size]': 10 }));
  },

  actions: {
    searchPrefix(query) {
      this.searchPrefix(query);
    },
    selectPrefix(prefix) {
      this.model['provider-prefix'].set('prefix', prefix);
      this.set('disabled', false);
      this.searchPrefix(null);
    },
    submit() {
      let self = this;
      this.model['provider-prefix'].save().then(function(providerPrefix) {
        self.transitionToRoute('providers.show.prefixes', providerPrefix.get('provider'));
      }).catch(function(reason) {
        console.debug(reason);
      });
    },
    cancel() {
      this.model['provider-prefix'].set('prefix', null);
      this.set('disabled', true);
      this.transitionToRoute('providers.show.prefixes', this.get('model.provider'));
    },
  },
});
