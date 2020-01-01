import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Validator | number-range', function(hooks) {
  setupTest(hooks);

  test('it works', function(assert) {
    let validator = this.owner.lookup('validator:number-range');
    assert.ok(validator);
  });
});
