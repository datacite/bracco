import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Validator | valid-xml', function(hooks) {
  setupTest(hooks);

  test('it works', function(assert) {
    var validator = this.owner.lookup('validator:valid-xml');
    assert.ok(validator);
  });
});
