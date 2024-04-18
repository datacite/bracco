import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  flashMessages: service(),
  // Enables showing newly assigned prefix on result page of repository creation.
  queryParams: ['assignedPrefix'],
  assignedPrefix: null
});
