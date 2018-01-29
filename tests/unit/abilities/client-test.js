import { moduleFor, test } from 'ember-qunit';

moduleFor('ability:client', 'Unit | Ability | client', {
  needs: ['service:currentUser']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  var ability = this.subject();
  assert.ok(ability);
});
