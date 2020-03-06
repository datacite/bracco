import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { get } from '@ember/object';
import { run } from '@ember/runloop';

module('Unit | Model | provider', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let model = run(() => this.owner.lookup('service:store').createRecord('provider'));
    assert.ok(!!model);
  });

  test('should belong to consortium', function(assert) {
    const Provider = this.owner.lookup('service:store').modelFor('provider');

    // lookup the relationship on the consortium model
    const relationship = get(Provider, 'relationshipsByName').get('consortium');

    assert.equal(relationship.key, 'consortium', 'has relationship with consortium');
    assert.equal(relationship.kind, 'belongsTo', 'kind of relationship is belongsTo');
  });

  test('should have many consortium organizations', function(assert) {
    const Provider = this.owner.lookup('service:store').modelFor('provider');

    // lookup the relationship on the consortiumOrganization model
    const relationship = get(Provider, 'relationshipsByName').get('consortiumOrganizations');

    assert.equal(relationship.key, 'consortiumOrganizations', 'has relationship with consortiumOrganizations');
    assert.equal(relationship.kind, 'hasMany', 'kind of relationship is hasMany');
  });

  test('should have meta data', function(assert) {
    let model = run(() => this.owner.lookup('service:store').createRecord('provider'));

    let meta = {clients: [ {id: '2011',title: '2011',count: 7}, {id: '2020',title: '2020',count: 11} ],
      dois: [ {id: '2011',title: '2011',count: 13567}, {id: '2020',title: '2020',count: 2440} ]};

    model.set('meta', meta);

    assert.equal(model.get('currentRepositoryCount'),11);
    assert.equal(model.get('repositoryList'),meta.clients);

    assert.equal(model.get('currentDoiCount'),2440);
    assert.equal(model.get('doiCount'),meta.dois);
  });
});
