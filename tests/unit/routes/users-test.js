import { moduleFor, test } from 'ember-qunit';

moduleFor('route:users', 'Unit | Route | users', {
  // Specify the other units that are required for this test.
  needs: ['service:google-analytics', 'service:can']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
