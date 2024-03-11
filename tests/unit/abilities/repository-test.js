import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import Service from '@ember/service';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Unit | Ability | repository', function (hooks) {
  setupTest(hooks);
  setupFactoryGuy(hooks);

  test('it exists', function (assert) {
    let ability = this.owner.lookup('ability:repository');
    assert.ok(ability);
  });

  test('role staff_admin', function (assert) {
    const ability = this.owner.lookup('ability:repository');
    const currentUser = Service.extend({
      uid: 'admin',
      name: 'Admin',
      role_id: 'staff_admin'
    });
    this.owner.register('service:current-user', currentUser);

    assert.true(ability.canSource);
    assert.true(ability.canCreate);
    assert.true(ability.canDelete);
    assert.true(ability.canUpdate);
    assert.true(ability.canToken);
    assert.true(ability.canRead);
  });

  // test('role provider_admin', function(assert) {
  //   const ability = this.owner.lookup('ability:repository');
  //   const currentUser = Service.extend({
  //     uid: 'ands',
  //     name: 'Australian National Data Service',
  //     role_id: 'provider_admin',
  //     provider_id: 'ands',
  //   });
  //   this.owner.register('service:current-user', currentUser);

  //   this.set('provider', make('ands'));
  //   this.set('contact', make('contact', { provider: this.provider }));
  //   this.set('model', make('repository', { provider: this.provider }));
  //   ability.model = this.model;

  //   assert.equal(ability.canSource, false);
  //   assert.equal(ability.canCreate, true);
  //   assert.equal(ability.canDelete, true);
  //   assert.equal(ability.canUpdate, true);
  //   assert.equal(ability.canToken, false);
  //   assert.equal(ability.canRead, true);
  // });

  test('role provider_admin globus', function (assert) {
    const ability = this.owner.lookup('ability:repository');
    const currentUser = Service.extend({
      uid: 'globus',
      name: 'Globus',
      role_id: 'provider_admin',
      provider_id: 'globus'
    });
    this.owner.register('service:current-user', currentUser);

    this.set('provider', make('provider', { id: 'globus' }));
    this.set('model', make('repository', { provider: this.provider }));
    ability.model = this.model;

    assert.true(ability.canToken);
    assert.true(ability.canRead);
  });

  test('role client_admin', function (assert) {
    const ability = this.owner.lookup('ability:repository');
    const currentUser = Service.extend({
      uid: 'ands.centre9',
      name: 'Australian Data Archive',
      role_id: 'client_admin',
      client_id: 'ands.centre9'
    });
    this.owner.register('service:current-user', currentUser);

    this.set('provider', make('ands'));
    this.set(
      'model',
      make('repository', { id: 'ands.centre9', provider: this.provider })
    );
    ability.model = this.model;

    assert.false(ability.canSource);
    assert.false(ability.canCreate);
    assert.false(ability.canDelete);
    assert.true(ability.canUpdate);
    assert.false(ability.canToken);
    assert.true(ability.canRead);
  });
});
