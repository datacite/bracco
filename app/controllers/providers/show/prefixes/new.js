import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import ENV from 'bracco/config/environment';

export default class NewController extends Controller {
  @service
  store;

  disabled = true;

  @service('prefixes')
  prefixes_service;

  @service
  router;

  init(...args) {
    super.init(...args);
    this.prefixes = this.prefixes || [];
  }

  searchPrefix(query) {
    let self = this;
    let prefixes = [];

    this.prefixes_service
      .get_prefixes(ENV.SHOW_N_PREFIXES, null, query)
      .then((values) => {
        values.forEach(function (value) {
          if (value.constructor.modelName == 'prefix') {
            let prefix = value;
            prefixes.push(prefix);
          } else {
            throw new Error('Expecting a prefix object. Got something else.');
          }
        });

        self.set('prefixes', prefixes);
      })
      .catch(function (reason) {
        console.debug(reason);
        self.set('prefixes', []);
      });
  }

  @action
  searchPrefixAction(query) {
    this.searchPrefix(query);
  }

  @action
  selectPrefixAction(prefix) {
    this.model['provider-prefix'].set('prefix', prefix);
    this.set('disabled', false);
    this.searchPrefix(null);
  }

  @action
  submitAction() {
    let self = this;
    this.model['provider-prefix']
      .save()
      .then(function (providerPrefix) {
        self.set('disabled', true);
        // We need a timeout because of ElasticSearch indexing
        setTimeout(() => {
          self.router.transitionTo(
            'providers.show.prefixes',
            providerPrefix.get('provider.id')
          );
        }, 1200);
      })
      .catch(function (reason) {
        console.debug(reason);
      });
  }

  @action
  cancelAction() {
    this.model['provider-prefix'].set('prefix', null);
    this.set('disabled', true);
    this.router.transitionTo(
      'providers.show.prefixes',
      this.get('model.provider')
    );
  }
}
