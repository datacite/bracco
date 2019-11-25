import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | providers/show/repositories', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:providers/show/repositories');
    assert.ok(route);
  });
});
