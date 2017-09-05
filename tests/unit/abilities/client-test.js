import { moduleFor, test } from 'ember-qunit';

moduleFor('ability:client', 'Unit | Ability | client', {
  // Specify the other units that are required for this test.
  needs: ['service:currentUser']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  var ability = this.subject();
  assert.ok(ability);
});
