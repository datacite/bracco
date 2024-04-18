import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import Service from '@ember/service';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Unit | Ability | doi', function (hooks) {
  setupTest(hooks);
  setupFactoryGuy(hooks);

  test('it exists', function (assert) {
    const ability = this.owner.lookup('ability:doi');
    assert.ok(ability);
  });

  test('role staff_admin', function (assert) {
    const ability = this.owner.lookup('ability:doi');
    const currentUser = Service.extend({
      uid: 'admin',
      name: 'Admin',
      role_id: 'staff_admin'
    });
    this.owner.register('service:current-user', currentUser);

    assert.true(ability.canViewHealth);
    assert.true(ability.canViewState);
    assert.true(ability.canSource);
    assert.true(ability.canTransfer);
    assert.true(ability.canMove);
    assert.true(ability.canUpdate);
    assert.true(ability.canUpload);
    assert.true(ability.canCreate);
    assert.true(ability.canDelete);
    assert.true(ability.canModify);
    assert.true(ability.canEdit);
    assert.true(ability.canForm);
    assert.true(ability.canDetail);
    assert.true(ability.canRead);
  });

  test('role provider_admin', function (assert) {
    const ability = this.owner.lookup('ability:doi');
    const currentUser = Service.extend({
      uid: 'datacite',
      name: 'DataCite',
      role_id: 'provider_admin',
      provider_id: 'ands'
    });
    this.owner.register('service:current-user', currentUser);

    this.set('provider', make('ands'));
    this.set(
      'repository',
      make('repository', { id: 'ands.centre9', provider: this.provider })
    );
    this.set('model', make('doi', { repository: this.repository }));
    ability.model = this.model;

    assert.true(ability.canViewHealth);
    assert.true(ability.canViewState);
    assert.false(ability.canSource);
    assert.true(ability.canTransfer);
    assert.true(ability.canMove);
    assert.true(ability.canUpdate);
    assert.false(ability.canUpload);
    assert.false(ability.canCreate);
    assert.false(ability.canDelete);
    assert.false(ability.canModify);
    assert.false(ability.canEdit);
    assert.false(ability.canForm);
    assert.true(ability.canDetail);
    assert.true(ability.canRead);
  });

  test('role client_admin', function (assert) {
    const ability = this.owner.lookup('ability:doi');
    const currentUser = Service.extend({
      uid: 'ands.centre9',
      name: 'Australian Data Archive',
      role_id: 'client_admin',
      client_id: 'ands.centre9'
    });
    this.owner.register('service:current-user', currentUser);

    this.set('provider', make('ands'));
    this.set(
      'repository',
      make('repository', { id: 'ands.centre9', provider: this.provider })
    );
    this.set('model', make('doi', { repository: this.repository }));
    ability.model = this.model;

    assert.false(ability.canViewHealth);
    assert.true(ability.canViewState);
    assert.false(ability.canSource);
    assert.false(ability.canTransfer);
    assert.false(ability.canMove);
    assert.true(ability.canUpdate);
    assert.true(ability.canUpload);
    assert.true(ability.canCreate);
    assert.true(ability.canDelete);
    assert.true(ability.canModify);
    assert.true(ability.canEdit);
    assert.false(ability.canForm);
    assert.true(ability.canDetail);
    assert.true(ability.canRead);
  });

  test('role consortium_admin', function (assert) {
    const ability = this.owner.lookup('ability:doi');
    const currentUser = Service.extend({
      uid: 'carl',
      name: 'Admin',
      role_id: 'consortium_admin',
      consortium_id: 'carl.frdr'
    });
    this.owner.register('service:current-user', currentUser);

    this.set('provider', make('carl'));
    this.set(
      'repository',
      make('repository', { id: 'carl.frdr', provider: this.provider })
    );
    this.set('model', make('doi', { repository: this.repository }));
    ability.model = this.model;

    assert.true(ability.canViewHealth);
    assert.true(ability.canViewState);
    assert.false(ability.canSource);
    assert.true(ability.canTransfer);
    assert.true(ability.canMove);
    assert.true(ability.canUpdate);
    assert.false(ability.canUpload);
    assert.false(ability.canCreate);
    assert.false(ability.canDelete);
    assert.false(ability.canModify);
    assert.false(ability.canEdit);
    assert.false(ability.canForm);
    assert.true(ability.canDetail);
    assert.true(ability.canRead);
  });
  // test('it canViewHealth', function(assert) {
  //   let ability = this.owner.lookup('ability:doi');
  //   const currentUser = Service.extend({
  //     uid: 'tib.awi',
  //     name: 'Alfred Wegener Institute',
  //     role_id: 'client_admin',
  //     provider_id: 'tib',
  //     client_id: 'tib.awi',
  //   });
  //   this.owner.register('service: ', currentUser);
  //   console.log(ability.currentUser);
  //   assert.equal(ability.canViewHealth, true);
  //   assert.equal(ability.canViewState, true);
  // });
});
