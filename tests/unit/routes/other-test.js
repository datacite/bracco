import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | other', function (hooks) {
  setupTest(hooks);

  test('info exists', function (assert) {
    let route = this.owner.lookup('route:info');
    assert.ok(route);
  });

  test('edit exists', function (assert) {
    let route = this.owner.lookup('route:edit');
    assert.ok(route);
  });

  test('change exists', function (assert) {
    let route = this.owner.lookup('route:change');
    assert.ok(route);
  });

  test('sign-in exists', function (assert) {
    let route = this.owner.lookup('route:sign-in');
    assert.ok(route);
  });

  test('authorize exists', function (assert) {
    let route = this.owner.lookup('route:authorize');
    assert.ok(route);
  });

  test('reset exists', function (assert) {
    let route = this.owner.lookup('route:reset');
    assert.ok(route);
  });

  test('password exists', function (assert) {
    let route = this.owner.lookup('route:password');
    assert.ok(route);
  });

  // test('404 exists', function(assert) {
  //   let route = this.owner.lookup('route:404');
  //   assert.ok(route);
  // });
});
