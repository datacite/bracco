import { moduleForModel, test } from 'ember-qunit';

moduleForModel('client', 'Unit | Model | client', {
  needs: ['validator:presence', 'validator:format', 'validator:length']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
