import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

let options, builtOptions, validator, message;

module('Unit | Validator | issn-format', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    validator = this.owner.lookup('validator:issn-format');
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

  test('issn', function (assert) {
    assert.expect(2);

    builtOptions = validator.buildOptions({}).toObject();

    message = validator.validate('offirgolan', builtOptions);
    assert.equal(message, 'Please enter a valid ISSN.');

    message = validator.validate('2050-084X', builtOptions);
    assert.equal(message, true);
  });

  test('uuid require_hyphen', function (assert) {
    assert.expect(2);

    options = {
      require_hyphen: true
    };
    options = validator.buildOptions(options, {}).toObject();

    message = validator.validate('2050-084X', options);
    assert.equal(message, true);

    message = validator.validate('2050084X', options);
    assert.equal(message, 'Please enter a valid ISSN.');
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
    assert.equal(message, 'Please enter a valid ISSN.');
  });
});
