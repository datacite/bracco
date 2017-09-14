import { moduleFor, test } from 'ember-qunit';

moduleFor('validator:client-id', 'Unit | Validator | client-id', {
  needs: ['validator:messages']
});

test('it works', function(assert) {
  var validator = this.subject();
  assert.ok(validator);
});
