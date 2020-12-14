import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { run } from '@ember/runloop';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

let model, nameIdentifier;

module('Unit | Model | contributor', function (hooks) {
  setupTest(hooks);
  setupFactoryGuy(hooks);

  test('it exists', function (assert) {
    model = run(() =>
      this.owner.lookup('service:store').createRecord('contributor')
    );
    assert.ok(!!model);
  });

  test('should compute displayName', function (assert) {
    model = run(() =>
      this.owner.lookup('service:store').createRecord('contributor')
    );
    const creator = make('creator');
    model.set('givenName', creator.givenName);
    model.set('familyName', creator.familyName);
    model.set('name', creator.name);
    assert.equal(model.displayName, 'Mitesh Patel');

    // new model as computed values are cached
    model = run(() =>
      this.owner.lookup('service:store').createRecord('contributor')
    );
    model.set('givenName', creator.givenName);
    model.set('familyName', null);
    model.set('name', creator.name);
    assert.equal(model.displayName, 'Patel, Mitesh');

    model = run(() =>
      this.owner.lookup('service:store').createRecord('contributor')
    );
    model.set('givenName', null);
    model.set('familyName', creator.familyName);
    model.set('name', creator.name);
    assert.equal(model.displayName, 'Patel, Mitesh');

    model = run(() =>
      this.owner.lookup('service:store').createRecord('contributor')
    );
    model.set('givenName', null);
    model.set('familyName', null);
    model.set('name', creator.name);
    assert.equal(model.displayName, 'Patel, Mitesh');
  });

  test('should compute orcid', function (assert) {
    model = run(() =>
      this.owner.lookup('service:store').createRecord('contributor')
    );
    nameIdentifier = [make('nameIdentifier')];
    model.set('nameIdentifiers', nameIdentifier);
    assert.equal(model.orcid, '0000-0003-1419-2405');

    // new model as computed values are cached
    model = run(() =>
      this.owner.lookup('service:store').createRecord('contributor')
    );
    nameIdentifier = [make('nameIdentifier', { nameIdentifierScheme: null })];
    model.set('nameIdentifiers', nameIdentifier);
    assert.equal(model.orcid, null);

    model = run(() =>
      this.owner.lookup('service:store').createRecord('contributor')
    );
    model.set('nameIdentifiers', null);
    assert.equal(model.orcid, null);
  });
});
