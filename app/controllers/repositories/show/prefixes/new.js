import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  store: service(),
  disabled: true,

  init(...args) {
    this._super(...args);

    this['provider-prefixes'] = this['provider-prefixes'] || [];
  },

  searchPrefix(query) {
    let self = this;
    this.store
      .query('provider-prefix', {
        query,
        'provider-id': this.model.repository.provider.id,
        state: 'without-repository',
        sort: 'name',
        'page[size]': 10
      })
      .then(function (providerPrefixes) {
        self.set('provider-prefixes', providerPrefixes);
      })
      .catch(function (reason) {
        console.debug(reason);
        self.set('provider-prefixes', []);
      });
  },

  actions: {
    searchPrefix(query) {
      this.searchPrefix(query);
    },
    selectPrefix(providerPrefix) {
      this.model['repository-prefix'].set('provider-prefix', providerPrefix);
      this.model['repository-prefix'].set('prefix', providerPrefix.prefix);
      this.set('disabled', false);
    },
    submit() {
      if (this.model['repository-prefix']['provider-prefix']) {
        let self = this;
        this.model['repository-prefix']
          .save()
          .then(function (repositoryPrefix) {
            self.set('disabled', true);
            // We need a timeout because ElasticSearch indexing is very slow for this transition to work properly
            setTimeout(() => {
              self.transitionToRoute(
                'repositories.show.prefixes',
                repositoryPrefix.repository.id
              );
            }, 1200);
          })
          .catch(function (reason) {
            console.debug(reason);
          });
      } else {
        this.transitionToRoute(
          'repositories.show.prefixes',
          this.model.repository
        );
      }
    },
    cancel() {
      this.model['repository-prefix'].set('provider-prefix', null);
      this.model['repository-prefix'].set('prefix', null);
      this.set('disabled', true);
      this.transitionToRoute(
        'repositories.show.prefixes',
        this.model.repository
      );
    }
  }
});
