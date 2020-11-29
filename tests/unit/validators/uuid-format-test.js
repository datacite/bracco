import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

let options, builtOptions, validator, message;

module('Unit | Validator | uuid-format', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    validator = this.owner.lookup('validator:uuid-format');
  });

  test('no options', function (assert) {
    assert.expect(1);

    builtOptions = validator.buildOptions({}).toObject();

    try {
      message = validator.validate(undefined, builtOptions);
    } catch (e) {
      assert.ok(true);
    }
  });

  test('uuid', function (assert) {
    assert.expect(2);

    builtOptions = validator.buildOptions({}).toObject();

    message = validator.validate('offirgolan', builtOptions);
    assert.equal(message, 'Please enter a valid UUID.');

    message = validator.validate(
      '9885f0b1-7d67-4df0-a282-0f422bd1b7eb',
      builtOptions
    );
    assert.equal(message, true);
  });

  test('uuid version 4', function (assert) {
    assert.expect(2);

    options = {
      version: 4
    };
    options = validator.buildOptions(options, {}).toObject();

    message = validator.validate(
      '9885f0b1-7d67-4df0-a282-0f422bd1b7eb',
      options
    );
    assert.equal(message, true);

    message = validator.validate('abc', options);
    assert.equal(message, 'Please enter a valid UUID (version 4).');
  });

  test('allow blank', function (assert) {
    assert.expect(2);

    options = {
      allowBlank: true
    };
    options = validator.buildOptions(options, {}).toObject();

    message = validator.validate(undefined, options);
    assert.equal(message, true);

    message = validator.validate('abc', options);
    assert.equal(message, 'Please enter a valid UUID.');
  });
});
