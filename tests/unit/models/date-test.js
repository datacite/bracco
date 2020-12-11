import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { run } from '@ember/runloop';

module('Unit | Model | date', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let model = run(() =>
      this.owner.lookup('service:store').createRecord('date')
    );
    assert.ok(!!model);
  });

  test('valid date', function (assert) {
    let date = run(() =>
      this.owner.lookup('service:store').createRecord('date')
    );

    date.set('date', '2020-10-20');
    assert.equal(date.date, '2020-10-20');
  });

  test('invalid date', function (assert) {
    let date = run(() =>
      this.owner.lookup('service:store').createRecord('date')
    );

    date.set('date', '2020-13-20');
    assert.equal(date.date, '2020-13-20');
  });
});
