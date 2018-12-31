import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | prefixes', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:prefixes');
    assert.ok(route);
  });
});
