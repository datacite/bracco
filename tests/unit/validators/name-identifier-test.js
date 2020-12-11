import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

let validator;

module('Unit | Validator | name-identifier', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    validator = this.owner.lookup('validator:name-identifier');
  });

  test('it works', function (assert) {
    assert.ok(validator);
  });
});
