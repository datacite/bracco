import Ember from 'ember';
const { service } = Ember.inject;
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, RouteMixin, {
  store: service(),

  model(params) {
    let doi = this.get('store').createRecord('doi', { client: params.client_id, prefix: '10.5072', state: 'draft' });
    return doi;
  },

  // afterModel(model) {
  //   if (!this.can('create doi', model)) {
  //     return this.transitionTo('index');
  //   }
  // }
});
