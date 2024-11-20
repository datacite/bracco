import { action } from '@ember/object';
import Controller from '@ember/controller';

export default class EditController extends Controller {
  queryParams = [
    'query',
    'resource-type-id',
    'provider-id',
    'client-id',
    'person-id',
    'affiliation-id',
    'prefix',
    'year',
    'state',
    'sort',
    'created',
    'registered',
    'schema-version',
    'source',
    'link-check-status',
    'certificate',
    'page',
    'size',
    'affiliation',
    'publisher'
  ];
  query = null;
  'resource-type-id' = null;
  'provider-id' = null;
  'client-id' = null;
  'person-id' = null;
  'affiliation-id' = null;
  prefix = null;
  year = null;
  created = null;
  registered = null;
  state = null;
  source = null;
  'link-check-status' = null;
  sort = '-updated';
  'schema-version' = null;
  certificate = null;
  page = 1;
  size = 25;
  affiliation = true;
  publisher = true;
}
