import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

moduleFor('ability:provider', 'Unit | Ability | provider', {
  currentUser: Ember.inject.service()
});

// Replace this with your real tests.
test('it exists', function(assert) {
  var ability = this.subject();
  assert.ok(ability);
});
