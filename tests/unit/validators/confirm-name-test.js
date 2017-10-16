import { moduleFor, test } from 'ember-qunit';

moduleFor('validator:confirm-name', 'Unit | Validator | confirm-name', {
  needs: ['validator:messages']
});

test('it works', function(assert) {
  var validator = this.subject();
  assert.ok(validator);
});
