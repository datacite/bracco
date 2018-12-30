import { moduleForModel, test } from 'ember-qunit';

moduleForModel('prefix', 'Unit | Model | prefix', {
  needs: ['model:provider', 'model:client']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
