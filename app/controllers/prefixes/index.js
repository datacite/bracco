import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
@classic
export default class ModifyController extends Controller {
  @service
  features;

  @service
  prefixes;

  @service
  flashMessages;

  queryParams = [
    'query',
    'provider-id',
    'client-id',
    'year',
    'state',
    'sort',
    'page',
    'size'
  ];
  query = null;
  'provider-id' = null;
  'client-id' = null;
  year = null;
  state = null;
  sort = null;
  page = 1;
  size = 25;
};
