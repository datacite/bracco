import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['query', 'region', 'member-type', 'organization-type', 'focus-area', 'include-deleted', 'year', 'sort', 'page', 'size'],
  query: null,
  region: null,
  'member-type': null,
  'organization-type': null,
  'focus-area': null,
  'include-deleted': null,
  year: null,
  sort: null,
  page: 1,
  size: 25
});
