import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  prefixes: service(),
  queryParams: ['query', 'provider-id', 'client-id', 'year', 'page', 'size'],
  query: null,
  'provider-id': null,
  'client-id': null,
  year: null,
  page: 1,
  size: 25
});
