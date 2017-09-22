import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

moduleFor('ability:doi', 'Unit | Ability | doi', {
  currentUser: Ember.inject.service()
});

// Replace this with your real tests.
test('it exists', function(assert) {
  var ability = this.subject();
  assert.ok(ability);
});
