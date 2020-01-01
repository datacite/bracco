import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | dois', function(hooks) {
  setupTest(hooks);

  test('index exists', function(assert) {
    let route = this.owner.lookup('route:dois');
    assert.ok(route);
  });

  test('show exists', function(assert) {
    let route = this.owner.lookup('route:dois/show');
    assert.ok(route);
  });

  test('edit exists', function(assert) {
    let route = this.owner.lookup('route:dois/show/edit');
    assert.ok(route);
  });

  test('modify exists', function(assert) {
    let route = this.owner.lookup('route:dois/show/modify');
    assert.ok(route);
  });

  test('delete exists', function(assert) {
    let route = this.owner.lookup('route:dois/show/delete');
    assert.ok(route);
  });

  test('transfer exists', function(assert) {
    let route = this.owner.lookup('route:dois/show/transfer');
    assert.ok(route);
  });
});
