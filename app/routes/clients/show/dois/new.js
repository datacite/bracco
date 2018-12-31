import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import { CanMixin } from 'ember-can';

export default Route.extend(CanMixin, RouteMixin, {

  model() {
    let client = this.modelFor('clients/show');
    let doi = this.store.createRecord('doi', { client: client, mode: 'new', state: 'draft', creators: '' });

    return hash({
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
