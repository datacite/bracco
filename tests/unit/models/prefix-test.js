import { moduleForModel, test } from 'ember-qunit';

moduleForModel('prefix', 'Unit | Model | prefix', {
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
