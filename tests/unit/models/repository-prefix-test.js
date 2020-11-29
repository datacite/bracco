import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { get } from '@ember/object';
import { run } from '@ember/runloop';

module('Unit | Model | repository-prefix', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let model = run(() =>
      this.owner.lookup('service:store').createRecord('providerPrefix')
    );
    assert.ok(!!model);
  });

  test('should belong to a repository', function (assert) {
    const RepositoryPrefix = this.owner
      .lookup('service:store')
      .modelFor('repositoryPrefix');

    // lookup the relationship on the repository model
    const relationship = get(RepositoryPrefix, 'relationshipsByName').get(
      'repository'
    );

    assert.equal(
      relationship.key,
      'repository',
      'has relationship with repository'
    );
    assert.equal(
      relationship.kind,
      'belongsTo',
      'kind of relationship is belongsTo'
    );
  });

  test('should belong to a prefix', function (assert) {
    const RepositoryPrefix = this.owner
      .lookup('service:store')
      .modelFor('repositoryPrefix');

    // lookup the relationship on the repository model
    const relationship = get(RepositoryPrefix, 'relationshipsByName').get(
      'prefix'
    );

    assert.equal(relationship.key, 'prefix', 'has relationship with prefix');
    assert.equal(
      relationship.kind,
      'belongsTo',
      'kind of relationship is belongsTo'
    );
  });

  test('should belong to a providerPrefix', function (assert) {
    const RepositoryPrefix = this.owner
      .lookup('service:store')
      .modelFor('repositoryPrefix');

    // lookup the relationship on the repository model
    const relationship = get(RepositoryPrefix, 'relationshipsByName').get(
      'provider-prefix'
    );

    assert.equal(
      relationship.key,
      'provider-prefix',
      'has relationship with providerPrefix'
    );
    assert.equal(
      relationship.kind,
      'belongsTo',
      'kind of relationship is belongsTo'
    );
  });
});
