import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

let validator, message;

module('Unit | Validator | date-format', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    validator = this.owner.lookup('validator:date-format');
  });

  test('year', function (assert) {
    assert.expect(2);

    message = validator.validate('20008');
    assert.equal(message, 'Please enter a valid date.');

    message = validator.validate('2008');
    assert.equal(message, true);
  });

  test('year-month', function (assert) {
    assert.expect(2);

    message = validator.validate('2008-20');
    assert.equal(message, 'Please enter a valid date.');

    message = validator.validate('2008-12');
    assert.equal(message, true);
  });

  test('date', function (assert) {
    assert.expect(2);

    message = validator.validate('2001-11-09d');
    assert.equal(message, 'Please enter a valid date.');

    message = validator.validate('2001-11-09');
    assert.equal(message, true);
  });

  test('timestamp', function (assert) {
    assert.expect(2);

    message = validator.validate('2015-07-02T06:000:005.000Z');
    assert.equal(message, 'Please enter a valid date.');

    message = validator.validate('2015-07-02T06:00:05.000Z');
    assert.equal(message, true);
  });

  test('range', function (assert) {
    assert.expect(2);

    message = validator.validate('2004-03-02~1999-06-02');
    assert.equal(message, 'Please enter a valid date.');

    // date ranges are not supported by the date-fms library
    message = validator.validate('2004-03-02/2005-06-02');
    assert.equal(message, 'Please enter a valid date.');
  });

  test('text', function (assert) {
    assert.expect(2);

    message = validator.validate('Febrera');
    assert.equal(message, 'Please enter a valid date.');

    message = validator.validate('2008 February');
    assert.equal(message, 'Please enter a valid date.');
  });

  test('500 BC', function (assert) {
    assert.expect(2);

    message = validator.validate('0500 BC');
    assert.equal(message, 'Please enter a valid date.');

    message = validator.validate('-0500');
    assert.equal(message, true);
  });
});
