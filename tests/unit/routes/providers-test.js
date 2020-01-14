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

  test('settings exists', function(assert) {
    let route = this.owner.lookup('route:providers/show/settings');
    assert.ok(route);
  });

  test('organizations exists', function(assert) {
    let route = this.owner.lookup('route:providers/show/organizations');
    assert.ok(route);
  });

  test('repositories exists', function(assert) {
    let route = this.owner.lookup('route:providers/show/repositories');
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
