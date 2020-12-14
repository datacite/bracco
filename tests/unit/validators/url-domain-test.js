import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { setupFactoryGuy, make, mockFindRecord } from 'ember-data-factory-guy';

let validator, message, builtOptions, mock;

module('Unit | Validator | url-domain', function (hooks) {
  setupTest(hooks);
  setupFactoryGuy(hooks);

  hooks.beforeEach(function () {
    validator = this.owner.lookup('validator:url-domain');
  });

  test('it exists', function (assert) {
    assert.ok(validator);
  });

  test('wildcard', function (assert) {
    builtOptions = validator.buildOptions({}).toObject();
    let repository = make('repository', {
      id: 'datacite.datacite',
      domains: '*'
    });
    mock = mockFindRecord('repository', {
      id: 'datacite.datacite',
      domains: '*'
    });

    console.log(mock);

    message = validator.validate(
      'https://example.org/123',
      builtOptions,
      make('doi', {
        repository: repository
      })
    );
    assert.equal(message, true);
  });
});
