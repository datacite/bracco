import { hash } from 'rsvp';
import { assign } from '@ember/polyfills';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),
  
  model(params) {
    let model = this.modelFor('researchers/show');
    params = assign(params, { 
      page: {
        number: params.page,
        size: params.size 
      },
      'researcher-id': model.get('id')
    });

    return hash({
      researcher: model,
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
    if (this.can.cannot('read researcher', this.modelFor('researchers/show'))) {
      this.transitionTo('index');
    }
  }
});
