import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

let builtOptions, validator;

module('Unit | Validator | repository-id', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    validator = this.owner.lookup('validator:repository-id');
  });

  test('it works', function (assert) {
    assert.ok(validator);
  });

  test('it validates', function (assert) {
    assert.equal(
      validator.validate('BL.UCL', builtOptions, {
        provider: { symbol: 'BL' }
      }),
      true,
      `validation of repository-id must succeed`
    );
  });

  test('it does not validate', function (assert) {
    assert.equal(
      validator.validate('BL.UCL', builtOptions, {
        provider: { symbol: 'TIB' }
      }),
      'The Repository ID must begin with TIB.',
      `validation of repository-id must fail`
    );
  });
});
