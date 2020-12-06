import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { run } from '@ember/runloop';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Unit | Model | subject', function (hooks) {
  setupTest(hooks);
  setupFactoryGuy(hooks);

  test('it exists', function (assert) {
    let model = run(() =>
      this.owner.lookup('service:store').createRecord('subject')
    );
    assert.ok(!!model);
  });

  test('should correct subject type', function (assert) {
    let model = run(() =>
      this.owner.lookup('service:store').createRecord('subject')
    );
    const subject = make('subject');
    model.set('subject', subject.subject);
    model.set('schemeUri', subject.schemeUri);
    model.set('valueUri', subject.valueUri);

    assert.equal(
      model.schemeUri,
      'http://www.oecd.org/science/inno/38235147.pdf'
    );
  });
});
