import { moduleFor, test } from 'ember-qunit';

moduleFor('ability:doi', 'Unit | Ability | doi', {
  // Specify the other units that are required for this test.
  needs: ['service:currentUser']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  var ability = this.subject();
  assert.ok(ability);
});
