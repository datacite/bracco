import { moduleForModel, test } from 'ember-qunit';

moduleForModel('permission', 'Unit | Model | permission', {
  needs: ['model:provider', 'model:client']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
