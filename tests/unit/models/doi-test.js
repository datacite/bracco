import { moduleForModel, test } from 'ember-qunit';

moduleForModel('doi', 'Unit | Model | doi', {
  needs: ['model:client', 'validator:presence', 'validator:confirmation', 'validator:belongs-to', 'validator:format', 'validator:unique-doi', 'validator:date', 'validator:metadata']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
