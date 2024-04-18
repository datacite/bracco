import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

let options, builtOptions, validator, message;

module('Unit | Validator | contributor-type', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    validator = this.owner.lookup('validator:contributor-type');
  });

  test('it works', function (assert) {
    let validator = this.owner.lookup('validator:contributor-type');
    assert.ok(validator);
  });

  test('Organizational', function (assert) {
    assert.expect(2);

    builtOptions = validator.buildOptions({}).toObject();

    message = validator.validate(['RegistrationAuthority'], options, {
      nameType: 'Personal'
    });
    assert.equal(
      message,
      'Contributor of the Type cannot be of that Name Type.'
    );

    message = validator.validate(['HostingInstitution'], builtOptions, {
      nameType: 'Organizational'
    });
    assert.true(message);
  });

  test('Personal', function (assert) {
    assert.expect(2);

    builtOptions = validator.buildOptions({}).toObject();

    message = validator.validate(['Supervisor'], options, {
      nameType: 'Organizational'
    });
    assert.equal(
      message,
      'Contributor of the Type cannot be of that Name Type.'
    );

    message = validator.validate(['ProjectManager'], builtOptions, {
      nameType: 'Personal'
    });
    assert.true(message);
  });

  test('either', function (assert) {
    assert.expect(2);

    builtOptions = validator.buildOptions({}).toObject();

    message = validator.validate(['DataCollector'], options, {
      nameType: 'Organizational'
    });
    assert.true(message);

    message = validator.validate(['DataCollector'], builtOptions, {
      nameType: 'Personal'
    });
    assert.true(message);
  });
});
