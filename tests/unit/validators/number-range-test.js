import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

let builtOptions, validator;

module('Unit | Validator | number-range', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    validator = this.owner.lookup('validator:number-range');
  });

  test('it works', function (assert) {
    assert.ok(validator);
  });

  test('it validates', function (assert) {
    assert.equal(
      validator.validate('10.1010', builtOptions, {
        firstPrefix: '10.1001'
      }),
      true,
      `validation of number range must succeed`
    );
  });

  test('last prefix should be larger', function (assert) {
    assert.equal(
      validator.validate('10.1001', builtOptions, {
        firstPrefix: '10.1010'
      }),
      `The last prefix must be or come after 10.1010.`,
      `validation of number range must fail`
    );
  });

  test("Can't get more than 500 prefixes", function (assert) {
    assert.equal(
      validator.validate('10.1502', builtOptions, {
        firstPrefix: '10.1001'
      }),
      "Can't add more than 500 prefixed at a time.",
      `validation of number range must fail`
    );
  });
});
