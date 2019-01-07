import { hash } from 'rsvp';
import { assign } from '@ember/polyfills';
import Route from '@ember/routing/route';
import { CanMixin } from 'ember-can';

export default Route.extend(CanMixin, {
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
    if (!this.can('read client', this.modelFor('clients/show'))) {
      return this.transitionTo('index');
    }
  }
});
