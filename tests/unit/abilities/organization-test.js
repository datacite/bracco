import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import Service from '@ember/service';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Unit | Ability | organization', function (hooks) {
  setupTest(hooks);
  setupFactoryGuy(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let ability = this.owner.lookup('ability:organization');
    assert.ok(ability);
  });

  test('role staff_admin', function (assert) {
    const ability = this.owner.lookup('ability:organization');
    const currentUser = Service.extend({
      uid: 'admin',
      name: 'Admin',
      role_id: 'staff_admin'
    });
    this.owner.register('service:current-user', currentUser);

    let model = {
      provider: make('carl'),
      organization: make('provider', { memberType: 'consortium_organization' })
    };

    ability.model = model;
    assert.true(ability.canCreate);
    assert.true(ability.canDelete);
    assert.true(ability.canUpdate);
    assert.true(ability.canRead);
  });

  test('role consortium_admin', function (assert) {
    const ability = this.owner.lookup('ability:organization');
    const currentUser = Service.extend({
      uid: 'carl',
      name: 'Admin',
      role_id: 'consortium_admin',
      consortium_id: 'carl.frdr'
    });
    this.owner.register('service:current-user', currentUser);

    let model = {
      provider: make('carl'),
      organization: make('provider', { memberType: 'consortium_organization' })
    };

    ability.model = model;
    assert.true(ability.canCreate);
    assert.true(ability.canDelete);
    assert.true(ability.canUpdate);
    assert.true(ability.canRead);
  });

  test('role provider_admin', function (assert) {
    const ability = this.owner.lookup('ability:organization');
    const currentUser = Service.extend({
      uid: 'carl',
      name: 'CARL',
      role_id: 'provider_admin',
      provider_id: 'carl'
    });
    this.owner.register('service:current-user', currentUser);

    let model = {
      id: 'carl',
      provider: make('carl'),
      organization: make('provider', { memberType: 'consortium_organization' })
    };

    ability.model = model;
    assert.false(ability.canCreate);
    assert.false(ability.canDelete);
    assert.true(ability.canUpdate);
    assert.true(ability.canRead);
  });
});
