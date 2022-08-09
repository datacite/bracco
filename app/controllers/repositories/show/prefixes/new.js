import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import prefix from 'bracco/abilities/prefix';

export default Controller.extend({
  store: service(),
  disabled: true,
  prefixes: service(),

  init(...args) {
    this._super(...args);

    this['provider-prefixes'] = this['provider-prefixes'] || [];
  },
  searchPrefix(query) {
    let self = this;
    let prefixes = [];

    this.prefixes.get_prefixes(2, this.model.repository.get('provider.id'), query)
      .then((values) => {
        let provider = this.model.repository.provider;

        values.forEach(
          function(value) {
            if (value.constructor.modelName == 'provider-prefix') {
              prefixes.push(value);
            } else if (value.constructor.modelName == 'prefix') {
              let prefix = value;
              let providerPrefix;
              providerPrefix = self.store.createRecord('providerPrefix', {
                provider, prefix
              });
              prefixes.push(providerPrefix);
            } else {
              throw new Error("Expecting a prefix object. Got something else.");
            }
          }
        );

        self.set('provider-prefixes', prefixes);

      }).catch(function (reason) {
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
      this.model['repository-prefix'].set(
        'prefix',
        providerPrefix.get('prefix')
      );
      this.set('disabled', false);
    },
    submit() {
      if (this.model['repository-prefix'].get('provider-prefix')) {
        let self = this;

        this.model['repository-prefix'].get('provider-prefix')
          .then ( m => {
            if (typeof m.get('createdAt') == 'undefined') {
              m.save()
              .then(function(value) {
                self.model['repository-prefix']
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
              })
            } else {
              self.model['repository-prefix']
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
            }
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
