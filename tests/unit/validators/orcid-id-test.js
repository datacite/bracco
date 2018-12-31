import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Validator | orcid-id', function(hooks) {
  setupTest(hooks);

  test('it works', function(assert) {
    var validator = this.owner.lookup('validator:orcid-id');
    assert.ok(validator);
  });
});
