import { moduleFor, test } from 'ember-qunit';

moduleFor('validator:metadata', 'Unit | Validator | metadata', {
  needs: ['validator:messages']
});

test('it works', function(assert) {
  var validator = this.subject();
  assert.ok(validator);
});
