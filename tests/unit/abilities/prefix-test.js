import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

moduleFor('ability:prefix', 'Unit | Ability | prefix', {
  currentUser: Ember.inject.service()
});

// Replace this with your real tests.
test('it exists', function(assert) {
  var ability = this.subject();
  assert.ok(ability);
});
