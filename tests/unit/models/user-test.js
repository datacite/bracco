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
    let model = run(() =>
      this.owner.lookup('service:store').createRecord('user')
    );

    let meta = {
      dois: [
        { id: '2011', title: '2011', count: 1 },
        { id: '2021', title: '2021', count: 1 }
      ],
      published: [
        { id: '2018', title: '2018', count: 1 },
        { id: '2021', title: '2021', count: 1 }
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
