import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';

@classic
export default class ApplicationController extends Controller {
  queryParams = ['query', 'role-id', 'sort', 'page', 'size'];
  query = null;
  'role-id' = null;
  sort = null;
  page = 1;
  size  = 25;
};
