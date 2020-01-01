import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | prefixes', function(hooks) {
  setupTest(hooks);

  test('index exists', function(assert) {
    let route = this.owner.lookup('route:prefixes');
    assert.ok(route);
  });

  test('new exists', function(assert) {
    let route = this.owner.lookup('route:prefixes/new');
    assert.ok(route);
  });
});
