import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Validator | metadata', function(hooks) {
  setupTest(hooks);

  test('it works', function(assert) {
    var validator = this.owner.lookup('validator:metadata');
    assert.ok(validator);
  });
});
