import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { run } from '@ember/runloop';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Unit | Model | contributor', function (hooks) {
  setupTest(hooks);
  setupFactoryGuy(hooks);

  test('it exists', function (assert) {
    let model = run(() =>
      this.owner.lookup('service:store').createRecord('contributor')
    );
    assert.ok(!!model);
  });

  test('displayNAme', function (assert) {
    let contributor = run(() =>
      this.owner.lookup('service:store').createRecord('contributor')
    );

    contributor.set('givenName', 'alan');
    contributor.set('familyName', 'smith');
    assert.equal(contributor.get('displayName'), 'alan smith');
  });

  test('orcid', function (assert) {
    let contributor = run(() =>
      this.owner.lookup('service:store').createRecord('contributor')
    );

    let nameIds = [this.set('model', make('nameIdentifier'))];
    contributor.set('nameIdentifiers', nameIds);
    assert.equal(contributor.get('orcid'), '0000-0003-1419-2405');
  });
});
