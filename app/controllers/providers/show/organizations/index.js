import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';

@classic
export default class ModifyController extends Controller {
  queryParams = [
    'query',
    'region',
    'consortium-id',
    'organization-type',
    'focus-area',
    'include-deleted',
    'non-profit-status',
    'has-required-contacts',
    'year',
    'sort',
    'page',
    'size'
  ];
  query = null;
  region = null;
  'consortium-id' = null;
  'organization-type' = null;
  'focus-area' = null;
  'include-deleted' = null;
  'non-profit-status' = null;
  'has-required-contacts' = null;
  year = null;
  sort = null;
  page = 1;
  size = 25;
};
