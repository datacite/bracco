import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Validator | client-id', function(hooks) {
  setupTest(hooks);

  test('it works', function(assert) {
    var validator = this.owner.lookup('validator:client-id');
    assert.ok(validator);
  });
});
