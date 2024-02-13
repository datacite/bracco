import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import ENV from 'bracco/config/environment';

export default Controller.extend({
  store: service(),
  router: service(),

  disabled: true,
  prefixes_service: service('prefixes'),

  init(...args) {
    this._super(...args);

    this.prefixes = this.prefixes || [];
  },

  searchPrefix(query) {
    let self = this;
    let prefixes = [];

    this.prefixes_service.get_prefixes(ENV.SHOW_N_PREFIXES, null, query)
      .then((values) => {
        values.forEach(
          function(value) {
            if (value.constructor.modelName == 'prefix') {
              let prefix = value;
              prefixes.push(prefix);
            } else {
              throw new Error("Expecting a prefix object. Got something else.");
            }
          }
        );

        self.set('prefixes', prefixes);

      }).catch(function (reason) {
        console.debug(reason);
        self.set('prefixes', []);
      });
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
      this.model['provider-prefix']
        .save()
        .then(function (providerPrefix) {
          self.set('disabled', true);
          // We need a timeout because of ElasticSearch indexing
          setTimeout(() => {
            self.router.transitionToRoute(
              'providers.show.prefixes',
              providerPrefix.get('provider.id')
            );
          }, 1200);
        })
        .catch(function (reason) {
          console.debug(reason);
        });
    },
    cancel() {
      this.model['provider-prefix'].set('prefix', null);
      this.set('disabled', true);
      this.router.transitionToRoute(
        'providers.show.prefixes',
        this.get('model.provider')
      );
    }
  }
});
