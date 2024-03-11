import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  flashMessages: service(),

  queryParams: [
    'query',
    'year',
    'provider-id',
    'repository-id',
    'sort',
    'page',
    'size'
  ],
  query: null,
  'provider-id': null,
  'repository-id': null,
  sort: null,
  page: 1,
  size: 25
});
