import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { get } from '@ember/object';
import { run } from '@ember/runloop';

module('Unit | Model | doi', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let model = run(() =>
      this.owner.lookup('service:store').createRecord('doi')
    );
    assert.ok(!!model);
  });

  test('should belong to a repository', function (assert) {
    const Doi = this.owner.lookup('service:store').modelFor('doi');

    // lookup the relationship on the doi model
    /* eslint-disable-next-line ember/no-get */
    const relationship = get(Doi, 'relationshipsByName').get('repository');

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
});
