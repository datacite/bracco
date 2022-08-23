self.deprecationWorkflow = self.deprecationWorkflow || {};
self.deprecationWorkflow.config = {
  workflow: [
    { handler: "silence", matchId: "computed-property.override" },
    { handler: "silence", matchId: "computed-property.volatile" },
    // ember-simple-auth deprecations
    { handler: "silence", matchId: "ember-simple-auth.mixins.unauthenticated-route-mixin" },
    { handler: "silence", matchId: "ember-simple-auth.events.session-service" },
    { handler: "silence", matchId: "ember-simple-auth.initializer.setup-session-restoration" },
    { handler: "silence", matchId: "ember-simple-auth.mixins.application-route-mixin" },
    { handler: "silence", matchId: "ember-simple-auth.mixins.data-adapter-mixin" },
  ]
};