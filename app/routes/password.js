import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Route from '@ember/routing/route';

export default Route.extend(AuthenticatedRouteMixin, {
  currentUser: service(),
  store: service(),

  authenticationRoute: 'sign-in',

  model() {
    if (this.currentUser.get('client_id')) {
      return this.store
        .findRecord('repository', this.currentUser.get('uid'))
        .then(function (repository) {
          repository.set('confirmSymbol', repository.get('symbol'));
          return repository;
        })
        .catch(function (reason) {
          console.debug(reason);
        });
    } else if (this.currentUser.get('provider_id')) {
      return this.store
        .findRecord('provider', this.currentUser.get('uid'))
        .then(function (provider) {
          provider.set('confirmSymbol', provider.get('symbol'));
          return provider;
        })
        .catch(function (reason) {
          console.debug(reason);
        });
    } else if (this.currentUser.get('uid') === 'admin') {
      return this.store
        .findRecord('provider', 'admin')
        .then(function (provider) {
          provider.set('confirmSymbol', provider.get('symbol'));
          return provider;
        })
        .catch(function (reason) {
          console.debug(reason);
        });
    }
  }
});
