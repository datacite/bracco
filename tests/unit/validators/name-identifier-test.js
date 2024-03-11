import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Validator | name-identifier', function (hooks) {
  setupTest(hooks);

  test('it works', function (assert) {
    let validator = this.owner.lookup('validator:name-identifier');
    assert.ok(validator);
  });
});
