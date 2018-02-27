import { moduleFor, test } from 'ember-qunit';

moduleFor('validator:valid-xml', 'Unit | Validator | valid-xml', {
  needs: ['validator:messages']
});

test('it works', function(assert) {
  var validator = this.subject();
  assert.ok(validator);
});
