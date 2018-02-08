import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Route from '@ember/routing/route';
const { service } = Ember.inject;

export default Route.extend(AuthenticatedRouteMixin, {
  currentUser: service(),
  
  authenticationRoute: "sign-in",

  model() {
    if (this.get('currentUser').get("client_id")) {
      return this.store.findRecord('client', this.get('currentUser').get("uid")).then(function(client) {
        client.set('confirmSymbol', client.get('symbol'));
        return client;
      });
    } else if (this.get('currentUser').get("provider_id")) {
      return this.store.findRecord('provider', this.get('currentUser').get("uid")).then(function(provider) {
        provider.set('confirmSymbol', provider.get('symbol'));
        return provider;
      });
    } else if (this.get('currentUser').get("uid") === "admin") {
      return this.store.findRecord('provider', "admin").then(function(provider) {
        provider.set('confirmSymbol', provider.get('symbol'));
        return provider;
      });
    }
  }
});
