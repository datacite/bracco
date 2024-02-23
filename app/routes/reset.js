import Route from '@ember/routing/route';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
import { inject as service } from '@ember/service';

export default Route.extend(UnauthenticatedRouteMixin, {
  router: service(),

  actions: {
    close() {
      this.router.transitionTo('index');
    },
  },
});
