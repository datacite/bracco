import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default class ShowController extends Controller {
  @service
  flashMessages;

  // Enables showing newly assigned prefix on result page of repository creation.
  queryParams = ['assignedPrefix'];

  assignedPrefix = null;
}
