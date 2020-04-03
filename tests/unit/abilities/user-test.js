import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import Service from '@ember/service';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Unit | Ability | user', function(hooks) {
  setupTest(hooks);
  setupFactoryGuy(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let ability = this.owner.lookup('ability:user');
    assert.ok(ability);
  });

  test('role staff_admin', function(assert) {
    const ability = this.owner.lookup('ability:user');
    const currentUser = Service.extend({
      uid: 'admin',
      name: 'Admin',
      role_id: 'staff_admin',
    });
    this.owner.register('service:current-user', currentUser);

    assert.equal(ability.canUpdate, true);
    assert.equal(ability.canRead, true);
  });

  test('role provider_admin', function(assert) {
    const ability = this.owner.lookup('ability:user');
    const currentUser = Service.extend({
      uid: 'datacite',
      name: 'DataCite',
      role_id: 'provider_admin',
    });
    this.owner.register('service:current-user', currentUser);

    assert.equal(ability.canUpdate, false);
    assert.equal(ability.canRead, true);
  });

  test('role client_admin', function(assert) {
    const ability = this.owner.lookup('ability:user');
    const currentUser = Service.extend({
      uid: 'ands.centre9',
      name: 'Australian Data Archive',
      role_id: 'client_admin',
      client_id: 'ands.centre9',
    });
    this.owner.register('service:current-user', currentUser);

    assert.equal(ability.canUpdate, false);
    assert.equal(ability.canRead, true);
  });

  test('role consortium_admin', function(assert) {
    const ability = this.owner.lookup('ability:user');
    const currentUser = Service.extend({
      uid: 'carl',
      name: 'Admin',
      role_id: 'consortium_admin',
      consortium_id: 'carl.frdr',
    });
    this.owner.register('service:current-user', currentUser);

    assert.equal(ability.canUpdate, false);
    assert.equal(ability.canRead, true);
  });

  test('role user', function(assert) {
    const ability = this.owner.lookup('ability:user');
    const currentUser = Service.extend({
      uid: 'carl',
      name: 'Admin',
      role_id: 'user',
      consortium_id: 'carl.frdr',
    });
    this.owner.register('service:current-user', currentUser);

    this.set('model', make('doi', { id: 'carl' }));
    ability.model = this.model;

    assert.equal(ability.canUpdate, true);
    assert.equal(ability.canRead, true);
  });
});