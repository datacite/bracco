import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { get } from '@ember/object';
import { run } from '@ember/runloop';

module('Unit | Model | provider-prefix', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let model = run(() =>
      this.owner.lookup('service:store').createRecord('providerPrefix')
    );
    assert.ok(!!model);
  });

  test('should belong to a provider', function (assert) {
    const ProviderPrefix = this.owner
      .lookup('service:store')
      .modelFor('providerPrefix');

    // lookup the relationship on the provider model
    /* eslint-disable-next-line ember/no-get */
    const relationship = get(ProviderPrefix, 'relationshipsByName').get(
      'provider'
    );

    assert.equal(
      relationship.key,
      'provider',
      'has relationship with provider'
    );
    assert.equal(
      relationship.kind,
      'belongsTo',
      'kind of relationship is belongsTo'
    );
  });

  test('should belong to a prefix', function (assert) {
    const ProviderPrefix = this.owner
      .lookup('service:store')
      .modelFor('providerPrefix');

    // lookup the relationship on the prefix model
    /* eslint-disable-next-line ember/no-get */
    const relationship = get(ProviderPrefix, 'relationshipsByName').get(
      'prefix'
    );

    assert.equal(relationship.key, 'prefix', 'has relationship with prefix');
    assert.equal(
      relationship.kind,
      'belongsTo',
      'kind of relationship is belongsTo'
    );
  });

  test('should have many repositories', function (assert) {
    const ProviderPrefix = this.owner
      .lookup('service:store')
      .modelFor('providerPrefix');

    // lookup the relationship on the consortiumOrganization model
    /* eslint-disable-next-line ember/no-get */
    const relationship = get(ProviderPrefix, 'relationshipsByName').get(
      'repositories'
    );

    assert.equal(
      relationship.key,
      'repositories',
      'has relationship with repositories'
    );
    assert.equal(
      relationship.kind,
      'hasMany',
      'kind of relationship is hasMany'
    );
  });
});
