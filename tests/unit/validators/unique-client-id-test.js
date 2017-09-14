import { moduleFor, test } from 'ember-qunit';

moduleFor('validator:unique-client-id', 'Unit | Validator | unique-client-id', {
  needs: ['validator:messages']
});

test('it works', function(assert) {
  var validator = this.subject();
  assert.ok(validator);
});
