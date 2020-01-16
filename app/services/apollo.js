import ApolloService from 'ember-apollo-client/services/apollo';
import { inject as service } from '@ember/service';

export default ApolloService.extend({
  session: service(),
});

class OverriddenApolloService extends ApolloService {
  clientOptions() {
    const opts = super.clientOptions();
    return {...opts, ssrMode: true };
  }
}