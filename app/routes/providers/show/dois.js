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
      'provider-id': this.modelFor('providers/show').get('id')
    });

    return hash({
      provider: this.modelFor('providers/show'),
      dois: this.store.query('doi', params)
    });
  },

  queryParams: {
    page: {
      refreshModel: true
    },
    size: {
      refreshModel: true
    }
  },

  afterModel() {
    if (this.get('can').cannot('read provider', this.modelFor('providers/show'))) {
      this.transitionTo('index');
    }
  }
});
