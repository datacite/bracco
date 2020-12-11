import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

let validator;

module('Unit | Validator | url-domain', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    validator = this.owner.lookup('validator:url-domain');
  });

  test('it exists', function (assert) {
    assert.ok(validator);
  });
});
