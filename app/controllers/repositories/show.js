import Controller from '@ember/controller';

export default Controller.extend({
  // Enables showing newly assigned prefix on result page of repository creation.
  queryParams: [ 'assignedPrefix' ],
  assignedPrefix: null,
});
