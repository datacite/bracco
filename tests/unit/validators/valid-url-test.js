import { moduleFor, test } from 'ember-qunit';

moduleFor('validator:valid-url', 'Unit | Validator | valid-url', {
  needs: ['validator:messages']
});

test('it works', function(assert) {
  var validator = this.subject();
  assert.ok(validator);
});
