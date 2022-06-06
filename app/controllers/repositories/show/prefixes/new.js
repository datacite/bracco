import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import prefix from 'bracco/abilities/prefix';

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
        'provider-id': this.model.repository.get('provider.id'),
        state: 'without-repository',
        sort: 'name',
        'page[size]': 10
      })
      .then(function (providerPrefixes) {
        if (providerPrefixes.length >= 10) {
          self.set('provider-prefixes', providerPrefixes);
        } else {
          let n = 10 - providerPrefixes.length;
          // Get pool prefixes.
          let provider = self.model.repository.provider;
          self.store
            .query('prefix', {
              'state': 'unassigned',
              sort: 'name',
              'page[size]': n
            })
            .then(function (prefixes) {
              let input = [];
              if (providerPrefixes.length > 0) {
                providerPrefixes.forEach(function(providerPrefix) {
                  input.push(providerPrefix);
                })
              }
              if (prefixes.length > 0) {
                providerPrefixes = input;
                prefixes.forEach(
                  function(prefix) {
                    let providerPrefix;
                    providerPrefix = self.store.createRecord('providerPrefix', {
                      provider, prefix
                    });
                    providerPrefixes.push(providerPrefix);
                  }
                )
                self.set('provider-prefixes', providerPrefixes);
              }
            })
            .catch(function (reason) {
              console.debug(reason);
              self.set('provider-prefixes', []);
            });
        }
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
      if ((typeof providerPrefix.get('createdAt')) == 'undefined') {
        providerPrefix.set('provider', this.model.repository.provider);
        providerPrefix.save();
      }
      this.model['repository-prefix'].set('provider-prefix', providerPrefix);
      this.model['repository-prefix'].set(
        'prefix',
        providerPrefix.get('prefix')
      );
      this.set('disabled', false);
    },
    submit() {
      if (this.model['repository-prefix'].get('provider-prefix')) {
        let self = this;
        this.model['repository-prefix']
          .save()
          .then(function (repositoryPrefix) {
            self.set('disabled', true);
            // We need a timeout because of ElasticSearch indexing
            setTimeout(() => {
              self.transitionToRoute(
                'repositories.show.prefixes',
                repositoryPrefix.get('repository.id')
              );
            }, 1200);
          })
          .catch(function (reason) {
            console.debug(reason);
          });
      } else {
        this.transitionToRoute(
          'repositories.show.prefixes',
          this.get('model.repository')
        );
      }
    },
    cancel() {
      this.model['repository-prefix'].set('provider-prefix', null);
      this.model['repository-prefix'].set('prefix', null);
      this.set('disabled', true);
      this.transitionToRoute(
        'repositories.show.prefixes',
        this.get('model.repository')
      );
    }
  }
});
