import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import ENV from 'bracco/config/environment';

export default Controller.extend({
  store: service(),
  disabled: true,
  prefixes_service: service('prefixes'),
  router: service(),

  init(...args) {
    this._super(...args);
    this.prefixes = this.prefixes || [];
  },
  searchPrefix(query) {
    let self = this;
    let prefixes = [];

    this.prefixes_service
      .get_prefixes(
        ENV.SHOW_N_PREFIXES,
        this.model.repository.get('provider.id'),
        query
      )
      .then((values) => {
        let provider = this.model.repository.provider;

        values.forEach(function (value) {
          if (value.constructor.modelName == 'provider-prefix') {
            prefixes.push(value);
          } else if (value.constructor.modelName == 'prefix') {
            let prefix = value;
            let providerPrefix;
            providerPrefix = self.store.createRecord('providerPrefix', {
              provider,
              prefix
            });
            prefixes.push(providerPrefix);
          } else {
            throw new Error('Expecting a prefix object. Got something else.');
          }
        });

        self.set('provider-prefixes', prefixes);
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
      this.model['repository-prefix'].set(
        'prefix',
        providerPrefix.get('prefix')
      );
      this.set('disabled', false);
    },
    submit() {
      if (this.model['repository-prefix'].get('provider-prefix')) {
        let self = this;

        this.model['repository-prefix'].get('provider-prefix').then((m) => {
          if (typeof m.get('createdAt') == 'undefined') {
            m.save().then(function (value) {
              self.model['repository-prefix']
                .save()
                .then(function (repositoryPrefix) {
                  self.set('disabled', true);
                  // We need a timeout because of ElasticSearch indexing
                  setTimeout(() => {
                    self.router.transitionTo(
                      'repositories.show.prefixes',
                      repositoryPrefix.get('repository.id')
                    );
                  }, 1200);
                })
                .catch(function (reason) {
                  console.debug(reason);
                });
            });
          } else {
            self.model['repository-prefix']
              .save()
              .then(function (repositoryPrefix) {
                self.set('disabled', true);
                // We need a timeout because of ElasticSearch indexing
                setTimeout(() => {
                  self.router.transitionTo(
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
        this.router.transitionTo(
          'repositories.show.prefixes',
          this.get('model.repository')
        );
      }
    },
    cancel() {
      this.model['repository-prefix'].set('provider-prefix', null);
      this.model['repository-prefix'].set('prefix', null);
      this.set('disabled', true);
      this.router.transitionTo(
        'repositories.show.prefixes',
        this.get('model.repository')
      );
    }
  }
});
