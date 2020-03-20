import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | prefixes', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:prefixes');
    assert.ok(controller);
  });
});
