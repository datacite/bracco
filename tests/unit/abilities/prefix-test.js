import { moduleFor, test } from 'ember-qunit';

moduleFor('ability:prefix', 'Unit | Ability | prefix', {
  // Specify the other units that are required for this test.
  needs: ['service:currentUser']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  var ability = this.subject();
  assert.ok(ability);
});
