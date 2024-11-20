import { action } from '@ember/object';
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {
  @service
  flashMessages;

  queryParams = [
    'query',
    'role-name',
    'include-deleted',
    'sort',
    'page',
    'size'
  ];
  query = null;
  'role-name' = null;
  'include-deleted' = null;
  sort = null;
  page = 1;
  size = 25;
};
