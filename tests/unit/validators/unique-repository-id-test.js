import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

let validator;

module('Unit | Validator | unique-repository-id', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    validator = this.owner.lookup('validator:unique-repository-id');
  });

  test('it works', function (assert) {
    assert.ok(validator);
  });

  // test('it validates', function (assert) {
  //   assert.equal(
  //     validator.validate('BL.UCL', builtOptions, {
  //       provider: { id: 'bl' }
  //     }),
  //     true,
  //     `validation of unique repository-id must succeed`
  //   );
  // });
});
