// adapted from https://raw.githubusercontent.com/offirgolan/ember-cp-validations/master/tests/unit/validators/format-test.js

import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

let options, builtOptions, validator, message;

module('Unit | Validator | email-format', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    validator = this.owner.lookup('validator:email-format');
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

  test('allow blank', function (assert) {
    assert.expect(2);

    options = {
      allowBlank: true
    };
    options = validator.buildOptions(options, {}).toObject();

    message = validator.validate(undefined, options);
    assert.equal(message, true);

    message = validator.validate('email', options);
    assert.equal(message, 'Please enter a valid email address.');
  });

  test('email no option', function (assert) {
    let validAddresses = [
      'email@domain.com',
      'firstname.lastname@domain.com',
      'email@subdomain.domain.com',
      'firstname+lastname@domain.com',
      '1234567890@domain.com',
      'email@domain-one.com',
      '_______@domain.com',
      'email@domain.name',
      'email@domain.co.jp',
      'firstname-lastname@domain.com',
      'EMAIL@DOMAIN.COM',
      'あいうえお@domain.com'
    ];
    let invalidAddresses = [
      'plainaddress',
      '#@%^%#$@#$@#.com',
      '@domain.com',
      'Joe Smith <email@domain.com>',
      'email.domain.com',
      'email@domain@domain.com',
      '.email@domain.com',
      'email.@domain.com',
      'email..email@domain.com',
      'email@domain.com (Joe Smith)',
      'email@domain',
      'email@domain.',
      'email@domain.-',
      'email@domain-',
      'email@domain-.',
      'email@domain.com.',
      'email@domain.com.-',
      'email@domain.com-',
      'email@domain.com-.',
      'email@-domain.com',
      'email@domain..com'
    ];

    assert.expect(validAddresses.length + invalidAddresses.length);

    builtOptions = validator.buildOptions({}).toObject();

    validAddresses.forEach((email) =>
      assert.equal(
        validator.validate(email, builtOptions),
        true,
        `validation of ${email} must succeed`
      )
    );
    invalidAddresses.forEach((email) =>
      assert.equal(
        validator.validate(email, options),
        'Please enter a valid email address.',
        `validation of ${email} must fail`
      )
    );
  });

  test('email option require_tld', function (assert) {
    let validAddresses = [
      'email@domain.com',
      'firstname.lastname@domain.com',
      'email@subdomain.domain.com',
      'firstname+lastname@domain.com',
      '1234567890@domain.com',
      'email@domain-one.com',
      '_______@domain.com',
      'email@domain.name',
      'email@domain.co.jp',
      'firstname-lastname@domain.com',
      'EMAIL@DOMAIN.COM',
      'email@domain',
      'あいうえお@domain.com'
    ];
    let invalidAddresses = [
      'plainaddress',
      '#@%^%#$@#$@#.com',
      '@domain.com',
      'Joe Smith <email@domain.com>',
      'email.domain.com',
      'email@domain@domain.com',
      '.email@domain.com',
      'email.@domain.com',
      'email..email@domain.com',
      'email@domain.com (Joe Smith)',
      'email@domain.',
      'email@domain.-',
      'email@domain-',
      'email@domain-.',
      'email@domain.com.',
      'email@domain.com.-',
      'email@domain.com-',
      'email@domain.com-.',
      'email@-domain.com',
      'email@domain..com'
    ];

    assert.expect(validAddresses.length + invalidAddresses.length);

    options = {
      require_tld: false
    };

    options = validator.buildOptions(options, {}).toObject();

    validAddresses.forEach((email) =>
      assert.equal(
        validator.validate(email, options),
        true,
        `validation of ${email} must succeed`
      )
    );
    invalidAddresses.forEach((email) =>
      assert.equal(
        validator.validate(email, options),
        'Please enter a valid email address.',
        `validation of ${email} must fail`
      )
    );
  });
});
