import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  features: service(), 
  
  queryParams: ['query', 'provider-id', 'client-id', 'year', 'state', 'sort', 'page', 'size'],
  query: null,
  'provider-id': null,
  'client-id': null,
  year: null,
  state: null,
  sort: null,
  page: 1,
  size: 25
});
