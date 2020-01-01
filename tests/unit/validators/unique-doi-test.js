import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Validator | unique-doi', function(hooks) {
  setupTest(hooks);

  test('it works', function(assert) {
    let validator = this.owner.lookup('validator:unique-doi');
    assert.ok(validator);
  });
});
