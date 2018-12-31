import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import { CanMixin } from 'ember-can';

export default Route.extend(CanMixin, RouteMixin, {

  model() {
    return hash({
      client: this.store.findRecord('client', this.modelFor('clients/show').get('id')),
      prefix: this.store.createRecord('client-prefix', { client: this.modelFor('clients/show').get('id') })
    });
  },

  // afterModel() {
  //   if (!this.can('create prefix')) {
  //     return this.transitionTo('index');
  //   }
  // }
});
