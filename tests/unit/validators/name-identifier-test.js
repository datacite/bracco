import { moduleFor, test } from 'ember-qunit';

moduleFor('validator:name-identifier', 'Unit | Validator | name-identifier', {
  needs: ['validator:messages']
});

test('it works', function(assert) {
  var validator = this.subject();
  assert.ok(validator);
});
