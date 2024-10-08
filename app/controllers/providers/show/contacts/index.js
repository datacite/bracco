import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';

@classic
export default class ModifyController extends Controller {
  queryParams = ['query', 'role-name', 'sort', 'page', 'size'];
  query = null;
  'role-name' = null;
  sort = null;
  page = 1;
  size = 25;
};
