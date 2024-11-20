import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class PrefixesRoute extends Route {
  @service
  store;
}
