/* global window */

window.deprecationWorkflow = window.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
  workflow: [
    { handler: 'silence', matchId: 'computed-property.volatile' },
    { handler: 'silence', matchId: 'computed-property.override' },
    { handler: 'silence', matchId: 'ember.globals-resolver' },
    { handler: 'silence', matchId: 'implicit-modifier-manager-capabilities' },
    { handler: 'silence', matchId: 'ember-cp-validations'},
    { handler: 'silence', matchId: 'ember-cp-validations.inline-validator'},
    { handler: 'silence', matchId: 'globals-resolver'},
    { handler: 'silence', matchId: 'ember-simple-auth.events.session-service' },
    { handler: 'silence', matchId: 'ember-source.deprecation-without-for' },
    { handler: 'silence', matchId: 'ember-source.deprecation-without-since' },
    { handler: 'silence', matchId: 'ember.globals-resolver' },
    { handler: 'silence', matchId: 'ember-simple-auth.mixins.unauthenticated-route-mixin' },
    { handler: 'silence', matchId: 'ember-simple-auth.mixins.application-route-mixin' },
    { handler: 'silence', matchId: 'ember-simple-auth.mixins.data-adapter-mixin' }
  ],
};
