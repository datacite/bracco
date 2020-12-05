import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Transform | xml', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let transform = this.owner.lookup('transform:xml');
    assert.ok(transform);
  });
});
