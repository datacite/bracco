import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

let validator;

module('Unit | Validator | unique-doi', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    validator = this.owner.lookup('validator:unique-doi');
  });

  test('it works', function (assert) {
    assert.ok(validator);
  });
});
