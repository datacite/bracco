import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  store: service(),

  queryParams: [ 'query', 'year', 'client-type', 'repository-type', 'certificate', 'software', 'sort', 'page', 'size' ],
  query: null,
  year: null,
  'client-type': null,
  'repository-type': null,
  certificate: null,
  software: null,
  sort: null,
  page: 1,
  size: 25,
});
