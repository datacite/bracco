import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

let validator, message;

module('Unit | Validator | valid-xml', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    validator = this.owner.lookup('validator:valid-xml');
  });

  test('it works', function (assert) {
    assert.ok(validator);
  });

  test('it validates', function (assert) {
    let xml = '<name>John</name>';
    message = validator.validate(xml);
    assert.equal(message, true);
  });

  test('it does not validate', function (assert) {
    let xml = '{ "name": "John" }';
    message = validator.validate(xml);
    assert.equal(message, 'The content is not valid XML.');
  });
});
