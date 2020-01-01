import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | users', function(hooks) {
  setupTest(hooks);

  test('index exists', function(assert) {
    let route = this.owner.lookup('route:users');
    assert.ok(route);
  });

  test('show exists', function(assert) {
    let route = this.owner.lookup('route:users/show');
    assert.ok(route);
  });

  test('settings exists', function(assert) {
    let route = this.owner.lookup('route:users/show/settings');
    assert.ok(route);
  });

  test('dois exists', function(assert) {
    let route = this.owner.lookup('route:users/show/dois');
    assert.ok(route);
  });
});
