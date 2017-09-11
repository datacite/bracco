import { moduleFor, test } from 'ember-qunit';

moduleFor('route:providers/show/clients', 'Unit | Route | providers/show/clients', {
  // Specify the other units that are required for this test.
  needs: ['service:google-analytics']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
