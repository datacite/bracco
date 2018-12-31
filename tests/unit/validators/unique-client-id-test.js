import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Validator | unique-client-id', function(hooks) {
  setupTest(hooks);

  test('it works', function(assert) {
    var validator = this.owner.lookup('validator:unique-client-id');
    assert.ok(validator);
  });
});
