import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { get } from '@ember/object';
import { run } from '@ember/runloop';

module('Unit | Model | prefix', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let model = run(() => this.owner.lookup('service:store').createRecord('prefix'));
    // let store = this.store();
    assert.ok(!!model);
  });

  test('should have many providers', function(assert) {
    const Prefix = this.owner.lookup('service:store').modelFor('prefix');

    // lookup the relationship on the providers model
    const relationship = get(Prefix, 'relationshipsByName').get('providers');

    assert.equal(relationship.key, 'providers', 'has relationship with providers');
    assert.equal(relationship.kind, 'hasMany', 'kind of relationship is hasMany');
  });

  test('should have many consortium organizations', function(assert) {
    const Prefix = this.owner.lookup('service:store').modelFor('prefix');

    // lookup the relationship on the consortiumOrganization model
    const relationship = get(Prefix, 'relationshipsByName').get('repositories');

    assert.equal(relationship.key, 'repositories', 'has relationship with repositories');
    assert.equal(relationship.kind, 'hasMany', 'kind of relationship is hasMany');
  });
});
