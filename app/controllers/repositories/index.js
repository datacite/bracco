import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  flashMessages: service(),

  queryParams: [
    'query',
    'year',
    'provider-id',
    'client-type',
    'repository-type',
    'certificate',
    'software',
    'include-deleted',
    'sort',
    'page',
    'size'
  ],
  query: null,
  year: null,
  'provider-id': null,
  'client-type': null,
  'repository-type': null,
  certificate: null,
  software: null,
  'include-deleted': null,
  sort: null,
  page: 1,
  size: 25
});
