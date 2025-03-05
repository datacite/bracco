/* global window */

/* Stopped silencing deprecations for ember-data beyond 4.6.5 since that is the current version we are using. */

window.deprecationWorkflow = window.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
  workflow: [
    // Keep this until ember 5.0.  Some ideas for fixing this deprecation include using: 'async/await' in model hook, 
    //  moving as many api calls to the 'promise-aware' model hook, finding references to relationships and making
    //  sure they are resolved before using.
    { handler: 'silence', matchId: 'ember-data:rsvp-unresolved-async' },
    // Keep this until ember 5.0.  This is an ember issue.  It is corrected in ember 5.0.
    { handler: 'silence', matchId: 'ember-string.add-package' },
    // Keep this until ember-data 5.0. We are using ember-data 4.6.5. This deprecated code is in ember-data through 4.12.
    { handler: 'silence', matchId: 'deprecate-ember-error' },
    { handler: 'silence', matchId: 'ember-data-mirror:deprecate-store-extends-ember-object' }
  ]
};
