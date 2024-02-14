import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  flashMessages: service(),

  queryParams: [
    'query',
    'organization-id',
    'region',
    'member-type',
    'organization-type',
    'focus-area',
    'include-deleted',
    'non-profit-status',
    'has-required-contacts',
    'year',
    'sort',
    'page',
    'size'
  ],
  query: null,
  region: null,
  'member-type': null,
  'organization-type': null,
  'focus-area': null,
  'include-deleted': null,
  'non-profit-status': null,
  'has-required-contacts': null,
  'organization-id': null,
  year: null,
  sort: null,
  page: 1,
  size: 25
});
