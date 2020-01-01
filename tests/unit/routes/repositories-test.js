import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | repositories', function(hooks) {
  setupTest(hooks);

  test('index exists', function(assert) {
    let route = this.owner.lookup('route:repositories');
    assert.ok(route);
  });

  test('show exists', function(assert) {
    let route = this.owner.lookup('route:repositories/show');
    assert.ok(route);
  });

  test('settings exists', function(assert) {
    let route = this.owner.lookup('route: repositories/show/settings');
    assert.ok(route);
  });

  test('dois exists', function(assert) {
    let route = this.owner.lookup('route: repositories/show/dois');
    assert.ok(route);
  });

  test('transfer exists', function(assert) {
    let route = this.owner.lookup('route: repositories/show/transfer');
    assert.ok(route);
  });

  test('prefixes exists', function(assert) {
    let route = this.owner.lookup('route: repositories/show/prefixes');
    assert.ok(route);
  });

  test('prefixes/new exists', function(assert) {
    let route = this.owner.lookup('route: repositories/show/prefixes/new');
    assert.ok(route);
  });

  test('prefixes/show exists', function(assert) {
    let route = this.owner.lookup('route: repositories/show/prefixes/show');
    assert.ok(route);
  });

  test('prefixes/delete exists', function(assert) {
    let route = this.owner.lookup('route: repositories/show/prefixes/delete');
    assert.ok(route);
  });
});
