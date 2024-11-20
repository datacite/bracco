import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default class PrefixesController extends Controller {
  @service
  features;
}
