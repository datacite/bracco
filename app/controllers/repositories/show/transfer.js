import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';

@classic
export default class ModifyController extends Controller {
  queryParams = ['query', 'provider-id', 'page', 'size'];
  query = null;
  'provider-id' = null;
  page = 1;
  size = 25;
};
