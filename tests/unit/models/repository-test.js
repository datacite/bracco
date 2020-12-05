import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { get } from '@ember/object';
import { run } from '@ember/runloop';

module('Unit | Model | repository', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let model = run(() =>
      this.owner.lookup('service:store').createRecord('repository')
    );
    assert.ok(!!model);
  });

  test('should belong to a provider', function (assert) {
    const repository = this.owner
      .lookup('service:store')
      .modelFor('repository');

    // lookup the relationship on the repository model
    const relationship = get(repository, 'relationshipsByName').get('provider');

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

  test('should correctly compute domainList', function (assert) {
    let model = run(() =>
      this.owner.lookup('service:store').createRecord('repository')
    );
    model.set('domains', 'datacite.org, datacite.de, datacite.fr');

    assert.equal(
      model.get('domainList'),
      'datacite.org,datacite.de,datacite.fr'
    );
  });
});
