import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:prefixes', 'Unit | Controller | prefixes', {
  // Specify the other units that are required for this test.
  needs: ['service:google-analytics']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});
