import { hash } from 'rsvp';
import { assign } from '@ember/polyfills';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),
  
  model(params) {
    let researcher = this.modelFor('researchers/show');
    params = assign(params, { 
      page: {
        number: params.page,
        size: params.size 
      },
      'researcher-id': researcher.get('id')
    });

    return hash({
      researcher: researcher,
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
