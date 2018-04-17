import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, RouteMixin, {

  model() {
    let client = this.modelFor('clients/show');
    let doi = this.store.createRecord('doi', { client: client, mode: 'new', state: 'draft' });

    return Ember.RSVP.hash({
      client: client,
      doi: doi
    });
  },

  // afterModel(model) {
  //   if (!this.can('create doi', model)) {
  //     return this.transitionTo('index');
  //   }
  // }
});
