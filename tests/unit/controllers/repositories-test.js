import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | repositories', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:repositories');
    assert.ok(controller);
  });

  test('should list organisation type list', function (assert) {
    let controller = this.owner.lookup(
      'controller:repositories.show.transfer-repository'
    );
    assert.ok(controller);
  });
});
