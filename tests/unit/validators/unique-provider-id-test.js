import { moduleFor, test } from 'ember-qunit';

moduleFor('validator:unique-provider-id', 'Unit | Validator | unique-provider-id', {
  needs: ['validator:messages']
});

test('it works', function(assert) {
  var validator = this.subject();
  assert.ok(validator);
});
