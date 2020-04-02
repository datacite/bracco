import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

let options, builtOptions, validator, message;

module('Unit | Validator | date-format', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    validator = this.owner.lookup('validator:date-format');
  });

  test('it works', function(assert) {
    let validator = this.owner.lookup('validator:date-format');
    assert.ok(validator);
  });

  test('year', function(assert) {
    assert.expect(2);

    builtOptions = validator.buildOptions({}).toObject();

    message = validator.validate('20008', options);
    assert.equal(message, 'Please enter a valid date');

    message = validator.validate('2008', builtOptions);
    assert.equal(message, true);
  });

  test('year-month', function(assert) {
    assert.expect(2);

    builtOptions = validator.buildOptions({}).toObject();

    message = validator.validate('2008-20', options);
    assert.equal(message, 'Please enter a valid date');

    message = validator.validate('2008-12', builtOptions);
    assert.equal(message, true);
  });

  test('date', function(assert) {
    assert.expect(2);

    builtOptions = validator.buildOptions({}).toObject();

    message = validator.validate('2001-11-09d', options);
    assert.equal(message, 'Please enter a valid date');

    message = validator.validate('2001-11-09', builtOptions);
    assert.equal(message, true);
  });

  test('timestamp', function(assert) {
    assert.expect(2);

    builtOptions = validator.buildOptions({}).toObject();

    message = validator.validate('2015-07-02T06:000:005.000Z', options);
    assert.equal(message, 'Please enter a valid date');

    message = validator.validate('2015-07-02T06:00:05.000Z', builtOptions);
    assert.equal(message, true);
  });

  test('range', function(assert) {
    assert.expect(2);

    builtOptions = validator.buildOptions({}).toObject();

    message = validator.validate('2004-03-02~1999-06-02', options);
    assert.equal(message, 'Please enter a valid date');

    message = validator.validate('2004-03-02/2005-06-02', builtOptions);
    assert.equal(message, true);
  });

  test('text', function(assert) {
    assert.expect(2);

    builtOptions = validator.buildOptions({}).toObject();

    message = validator.validate('Febrera', options);
    assert.equal(message, 'Please enter a valid date');

    message = validator.validate('2008 February', builtOptions);
    assert.equal(message, 'Please enter a valid date');
  });
});


