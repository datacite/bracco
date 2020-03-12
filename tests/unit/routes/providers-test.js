import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | providers', function(hooks) {
  setupTest(hooks);

  test('index exists', function(assert) {
    let route = this.owner.lookup('route:providers');
    assert.ok(route);
  });

  test('show exists', function(assert) {
    let route = this.owner.lookup('route:providers/show');
    assert.ok(route);
  });

  test('dashboard exists', function(assert) {
    let route = this.owner.lookup('route:providers/show/dashboard');
    assert.ok(route);
  });

  test('organizations/index exists', function(assert) {
    let route = this.owner.lookup('route:providers/show/organizations/index');
    assert.ok(route);
  });

  test('organizations/new exists', function(assert) {
    let route = this.owner.lookup('route:providers/show/organizations/new');
    assert.ok(route);
  });

  test('repositories/index exists', function(assert) {
    let route = this.owner.lookup('route:providers/show/repositories/index');
    assert.ok(route);
  });

  test('repositories/new exists', function(assert) {
    let route = this.owner.lookup('route:providers/show/repositories/new');
    assert.ok(route);
  });

  test('dois exists', function(assert) {
    let route = this.owner.lookup('route:providers/show/dois');
    assert.ok(route);
  });

  test('prefixes exists', function(assert) {
    let route = this.owner.lookup('route:providers/show/prefixes');
    assert.ok(route);
  });

  test('prefixes/new exists', function(assert) {
    let route = this.owner.lookup('route:providers/show/prefixes/new');
    assert.ok(route);
  });

  test('prefixes/show exists', function(assert) {
    let route = this.owner.lookup('route:providers/show/prefixes/show');
    assert.ok(route);
  });

  test('prefixes/delete exists', function(assert) {
    let route = this.owner.lookup('route:providers/show/prefixes/delete');
    assert.ok(route);
  });
});
