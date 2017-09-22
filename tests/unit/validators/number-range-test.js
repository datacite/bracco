import { moduleFor, test } from 'ember-qunit';

moduleFor('validator:number-range', 'Unit | Validator | number-range', {
  needs: ['validator:messages']
});

test('it works', function(assert) {
  var validator = this.subject();
  assert.ok(validator);
});
