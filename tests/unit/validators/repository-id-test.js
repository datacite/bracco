import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Validator | repository-id', function (hooks) {
  setupTest(hooks);

  test('it works', function (assert) {
    let validator = this.owner.lookup('validator:repository-id');
    assert.ok(validator);
  });
});
