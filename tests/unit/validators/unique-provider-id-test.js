import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

let validator;

module('Unit | Validator | unique-provider-id', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    validator = this.owner.lookup('validator:unique-provider-id');
  });

  test('it works', function (assert) {
    assert.ok(validator);
  });
});
