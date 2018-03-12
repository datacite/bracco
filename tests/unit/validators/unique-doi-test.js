import { moduleFor, test } from 'ember-qunit';

moduleFor('validator:unique-doi', 'Unit | Validator | unique-doi', {
  needs: ['validator:messages']
});

test('it works', function(assert) {
  var validator = this.subject();
  assert.ok(validator);
});
