import { hash } from 'rsvp';
import { assign } from '@ember/polyfills';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),
  
  model(params) {
    let user = this.modelFor('users/show');
    params = assign(params, { 
      page: {
        number: params.page,
        size: params.size 
      },
      'user-id': user.get('id')
    });

    return hash({
      user: user,
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
    if (this.can.cannot('read user', this.modelFor('users/show'))) {
      this.transitionTo('index');
    }
  }
});
