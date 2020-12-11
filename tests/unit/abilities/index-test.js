import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import Service from '@ember/service';

module('Unit | Ability | index', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let ability = this.owner.lookup('ability:index');
    assert.ok(ability);
  });

  test('role staff_admin', function (assert) {
    const ability = this.owner.lookup('ability:index');
    const currentUser = Service.extend({
      uid: 'admin',
      name: 'Admin',
      role_id: 'staff_admin'
    });
    this.owner.register('service:current-user', currentUser);

    assert.equal(ability.canRead, true);
    assert.equal(ability.canWrite, true);
  });

  test('role provider_admin', function (assert) {
    const ability = this.owner.lookup('ability:index');
    const currentUser = Service.extend({
      uid: 'datacite',
      name: 'DataCite',
      provider_id: 'datacite',
      role_id: 'provider_admin'
    });
    this.owner.register('service:current-user', currentUser);

    assert.equal(ability.canRead, false);
    assert.equal(ability.canWrite, false);
  });

  test('role client_admin', function (assert) {
    const ability = this.owner.lookup('ability:index');
    const currentUser = Service.extend({
      uid: 'ands.centre9',
      name: 'Australian Data Archive',
      role_id: 'client_admin',
      client_id: 'ands.centre9'
    });
    this.owner.register('service:current-user', currentUser);

    assert.equal(ability.canRead, false);
    assert.equal(ability.canWrite, false);
  });

  test('role consortium_admin', function (assert) {
    const ability = this.owner.lookup('ability:index');
    const currentUser = Service.extend({
      uid: 'carl',
      name: 'Admin',
      provider_id: 'carl',
      role_id: 'consortium_admin',
      consortium_id: 'carl.frdr'
    });
    this.owner.register('service:current-user', currentUser);

    assert.equal(ability.canRead, false);
    assert.equal(ability.canWrite, false);
  });

  test('role user', function (assert) {
    const ability = this.owner.lookup('ability:index');
    const currentUser = Service.extend({
      uid: 'carl',
      name: 'Admin',
      role_id: 'user',
      consortium_id: 'carl.frdr'
    });
    this.owner.register('service:current-user', currentUser);

    assert.equal(ability.canRead, false);
    assert.equal(ability.canWrite, false);
  });

  test('role anonymous', function (assert) {
    const ability = this.owner.lookup('ability:index');

    assert.equal(ability.canRead, false);
    assert.equal(ability.canWrite, false);
  });
});
