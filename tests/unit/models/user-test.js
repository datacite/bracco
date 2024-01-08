import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { run } from '@ember/runloop';

module('Unit | Model | user', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let model = run(() =>
      this.owner.lookup('service:store').createRecord('user')
    );
    assert.ok(!!model);
  });

  test('should have meta data', function (assert) {
    let currentYear = new Date().getFullYear();
    let startDate10 = (currentYear - 10).toString();
    let startDate5 = (currentYear - 5).toString();
    let endDate = currentYear.toString();

    let model = run(() =>
      this.owner.lookup('service:store').createRecord('user')
    );

    let meta = {
      dois: [
        { id: startDate10, title: startDate10, count: 1 },
        { id: endDate, title: endDate, count: 1 }
      ],
      published: [
        { id: startDate5, title: startDate5, count: 1 },
        { id: endDate, title: endDate, count: 1 }
      ],
      resourceTypes: [
        { id: 'text', title: 'Text', count: 1 },
        { id: 'dataset', title: 'Dataset', count: 1 }
      ],
      citations: []
    };

    model.set('meta', meta);

    assert.equal(model.get('currentDoiCount'), 1);
    assert.equal(model.get('totalDoiCount'), 2);
    assert.equal(model.get('totalResourceTypeCount'), 2);
    assert.equal(model.get('totalCitationCount'), 0);
  });
});
