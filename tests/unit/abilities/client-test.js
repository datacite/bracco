import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Ability | client', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    var ability = this.owner.lookup('ability:client');
    assert.ok(ability);
  });
});
