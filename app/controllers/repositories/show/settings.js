import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default class SettingsController extends Controller {
  @service
  flashMessages;
}
