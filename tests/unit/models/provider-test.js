import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { get } from '@ember/object';
import { run } from '@ember/runloop';

module('Unit | Model | provider', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let model = run(() =>
      this.owner.lookup('service:store').createRecord('provider')
    );
    assert.ok(!!model);
  });

  test('should belong to consortium', function (assert) {
    const Provider = this.owner.lookup('service:store').modelFor('provider');

    // lookup the relationship on the consortium model
    /* eslint-disable-next-line ember/no-get */
    const relationship = get(Provider, 'relationshipsByName').get('consortium');

    assert.equal(
      relationship.key,
      'consortium',
      'has relationship with consortium'
    );
    assert.equal(
      relationship.kind,
      'belongsTo',
      'kind of relationship is belongsTo'
    );
  });

  test('should have many consortium organizations', function (assert) {
    const Provider = this.owner.lookup('service:store').modelFor('provider');

    // lookup the relationship on the consortiumOrganization model
    /* eslint-disable-next-line ember/no-get */
    const relationship = get(Provider, 'relationshipsByName').get(
      'consortiumOrganizations'
    );

    assert.equal(
      relationship.key,
      'consortiumOrganizations',
      'has relationship with consortiumOrganizations'
    );
    assert.equal(
      relationship.kind,
      'hasMany',
      'kind of relationship is hasMany'
    );
  });
});
