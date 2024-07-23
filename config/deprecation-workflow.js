/* global window */

window.deprecationWorkflow = window.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
  workflow: [
    { handler: 'silence', matchId: 'ember-data:deprecate-early-static' },
    { handler: 'silence', matchId: 'ember-data:deprecate-model-reopenclass' },
    { handler: 'silence', matchId: 'ember-data:deprecate-normalize-modelname-helper' },
    { handler: 'silence', matchId: 'ember-data:deprecate-v1cache-store-apis' },
    { handler: 'silence', matchId: 'ember-data:rsvp-unresolved-async' },
    // Keep this until ember 5.0.  This is an ember issue is corrected in ember 5.0.
    { handler: 'silence', matchId: 'ember-string.add-package'},
    // Keep this until ember-data 5.0. We are using ember-data 4.6.5. This deprecated code is in ember-data through 4.12.
    { handler: 'silence', matchId: 'deprecate-ember-error' }
  ]
};
