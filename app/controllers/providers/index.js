import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: [ 'query', 'organization-id', 'region', 'member-type', 'organization-type', 'focus-area', 'include-deleted', 'non-profit-status', 'year', 'sort', 'page', 'size' ],
  query: null,
  region: null,
  'member-type': null,
  'organization-type': null,
  'focus-area': null,
  'include-deleted': null,
  'non-profit-status': null,
  'organization-id': null,
  year: null,
  sort: null,
  page: 1,
  size: 25,
});
