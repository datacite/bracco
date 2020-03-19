import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  store: service(),

  actions: {
    searchPrefix(query) {
      this.set('prefixes', this.store.query('prefix', { query, state: 'unassigned', sort: 'name', 'page[size]': 25 }));
    },
    selectPrefix(prefix) {
      this.model['provider-prefix'].set('prefix', prefix);
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
      this.transitionToRoute('providers.show.prefixes', this.get('model.provider'));
    },
  },
});
