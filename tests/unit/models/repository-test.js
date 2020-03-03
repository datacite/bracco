import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { get } from '@ember/object';
import { run } from '@ember/runloop';

module('Unit | Model | repository', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let model = run(() => this.owner.lookup('service:store').createRecord('repository'));
    assert.ok(!!model);
  });

  test('should belong to a provider', function(assert) {
    const Repository = this.owner.lookup('service:store').modelFor('repository');

    // lookup the relationship on the repository model
    const relationship = get(Repository, 'relationshipsByName').get('provider');

    assert.equal(relationship.key, 'provider', 'has relationship with provider');
    assert.equal(relationship.kind, 'belongsTo', 'kind of relationship is belongsTo');
  });

  test('should have meta data', function(assert) {
    let model = run(() => this.owner.lookup('service:store').createRecord('repository'));

    let meta = {dois: [ {id: '2011',title: '2011',count: 13567}, {id: '2020',title: '2020',count: 2440} ],
      resourceTypes: [ {id: 'text',title: 'Text',count: 1848}, {id: 'dataset',title: 'Dataset',count: 59} ]};

    model.set('meta', meta);

    assert.equal(model.get('totalDoiCount'),16007);
    assert.equal(model.get('doiCount'),meta.dois);

    assert.equal(model.get('resourceTypeCount'),1907);
  });

  // test('should correctly compute domainList', function(assert) {
  //   let model = this.subject();
  //   model.set('domains', 'datacite.org, datacite.de, datacite.fr');
  //
  //   assert.equal(model.get('domainList'), 'computed baz');
  // });
});
