import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { get } from '@ember/object';
import { run } from '@ember/runloop';

let model, repository;

module('Unit | Model | doi', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    model = run(() => this.owner.lookup('service:store').createRecord('doi'));
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

  test('should compute schemaVersionString', function (assert) {
    model = run(() => this.owner.lookup('service:store').createRecord('doi'));
    model.set('schemaVersion', 'http://datacite.org/schema/kernel-4');
    assert.equal(model.schemaVersionString, '4');

    // new model as computed values are cached
    model = run(() => this.owner.lookup('service:store').createRecord('doi'));
    model.set('schemaVersion', null);
    assert.equal(model.schemaVersionString, null);
  });

  test('should compute identifier', function (assert) {
    model = run(() => this.owner.lookup('service:store').createRecord('doi'));
    model.set('doi', '10.5438/cxe5-rg55');
    assert.equal(
      model.identifier,
      'https://handle.stage.datacite.org/10.5438/cxe5-rg55'
    );

    // new model as computed values are cached
    repository = run(() =>
      this.owner.lookup('service:store').createRecord('repository')
    );
    repository.set('id', 'crossref.citations');
    model = run(() => this.owner.lookup('service:store').createRecord('doi'));
    model.set('doi', '10.5438/cxe5-rg55');
    model.set('repository', repository);
    assert.equal(model.identifier, 'https://doi.org/10.5438/cxe5-rg55');
  });

  test('should compute title', function (assert) {
    model = run(() => this.owner.lookup('service:store').createRecord('doi'));
    model.set('titles', [{ title: 'This is a title' }]);
    assert.equal(model.title, 'This is a title');

    // new model as computed values are cached
    model = run(() => this.owner.lookup('service:store').createRecord('doi'));
    model.set('titles', []);
    assert.equal(model.title, null);
  });

  test('should compute description', function (assert) {
    model = run(() => this.owner.lookup('service:store').createRecord('doi'));
    model.set('descriptions', [{ description: 'This is a description' }]);
    assert.equal(model.description, 'This is a description');

    // new model as computed values are cached
    model = run(() => this.owner.lookup('service:store').createRecord('doi'));
    model.set('descriptions', []);
    assert.equal(model.description, null);
  });
});
