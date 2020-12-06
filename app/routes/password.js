import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Route from '@ember/routing/route';

export default Route.extend(AuthenticatedRouteMixin, {
  currentUser: service(),

  authenticationRoute: 'sign-in',

  model() {
    if (this.currentUser.client_id) {
      return this.store
        .findRecord('repository', this.currentUser.uid)
        .then(function (repository) {
          repository.set('confirmSymbol', repository.symbol);
          return repository;
        })
        .catch(function (reason) {
          console.debug(reason);
        });
    } else if (this.currentUser.provider_id) {
      return this.store
        .findRecord('provider', this.currentUser.uid)
        .then(function (provider) {
          provider.set('confirmSymbol', provider.symbol);
          return provider;
        })
        .catch(function (reason) {
          console.debug(reason);
        });
    } else if (this.currentUser.uid === 'admin') {
      return this.store
        .findRecord('provider', 'admin')
        .then(function (provider) {
          provider.set('confirmSymbol', provider.symbol);
          return provider;
        })
        .catch(function (reason) {
          console.debug(reason);
        });
    }
  }
});
