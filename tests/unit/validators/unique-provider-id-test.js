import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Validator | unique-provider-id', function(hooks) {
  setupTest(hooks);

  test('it works', function(assert) {
    var validator = this.owner.lookup('validator:unique-provider-id');
    assert.ok(validator);
  });
});
