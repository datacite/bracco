import { hash } from 'rsvp';
import { assign } from '@ember/polyfills';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),

  model(params) {
    params = assign(params, { 
      page: {
        number: params.page,
        size: params.size 
      },
      'client-id': this.modelFor('clients/show').get('id')
    });

    return hash({
      client: this.modelFor('clients/show'),
      prefixes: this.store.query('client-prefix', params)
    });
  },

  afterModel() {
    if (this.get('can').cannot('read client', this.modelFor('clients/show'))) {
      return this.transitionTo('index');
    }
  },

  actions: {
    queryParamsDidChange() {
      this.refresh();
    },
    refreshCurrentRoute(){
      this.refresh();
    }
  }
});
