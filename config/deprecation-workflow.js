/* global window */

window.deprecationWorkflow = window.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
  workflow: [
    { handler: 'silence', matchId: 'ember-data:deprecate-early-static' },
    { handler: 'silence', matchId: 'ember-data:deprecate-model-reopenclass' },
    { handler: 'silence', matchId: 'ember-data:deprecate-normalize-modelname-helper' },
    { handler: 'silence', matchId: 'ember-data:deprecate-v1cache-store-apis' },
    { handler: 'silence', matchId: 'ember-data:rsvp-unresolved-async' },
    { handler: 'silence', matchId: 'ember-string.add-package' },
    { handler: 'silence', matchId: 'ember-polyfills.deprecate-assign' }
  ]
};
