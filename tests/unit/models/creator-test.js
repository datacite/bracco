import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { run } from '@ember/runloop';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Unit | Model | creator', function (hooks) {
  setupTest(hooks);
  setupFactoryGuy(hooks);

  test('it exists', function (assert) {
    let model = run(() =>
      this.owner.lookup('service:store').createRecord('creator')
    );
    assert.ok(!!model);
  });

  test('should correct creator name', function (assert) {
    let model = run(() =>
      this.owner.lookup('service:store').createRecord('creator')
    );
    const creator = make('creator');
    model.set('givenName', creator.givenName);
    model.set('familyName', creator.familyName);
    assert.equal(model.get('displayName'), 'Mitesh Patel');

    const nameIdentifier = [make('nameIdentifier')];
    model.set('nameIdentifiers', nameIdentifier);
    assert.equal(model.get('orcid'), '0000-0003-1419-2405');
  });
});
