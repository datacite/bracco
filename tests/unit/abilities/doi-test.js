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

    assert.equal(ability.canViewHealth, true);
    assert.equal(ability.canViewState, true);
    assert.equal(ability.canSource, true);
    assert.equal(ability.canTransfer, true);
    assert.equal(ability.canMove, true);
    assert.equal(ability.canUpdate, true);
    assert.equal(ability.canUpload, true);
    assert.equal(ability.canCreate, true);
    assert.equal(ability.canDelete, true);
    assert.equal(ability.canModify, true);
    assert.equal(ability.canEdit, true);
    assert.equal(ability.canForm, true);
    assert.equal(ability.canDetail, true);
    assert.equal(ability.canRead, true);
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

    assert.equal(ability.canViewHealth, true);
    assert.equal(ability.canViewState, true);
    assert.equal(ability.canSource, false);
    assert.equal(ability.canTransfer, true);
    assert.equal(ability.canMove, true);
    assert.equal(ability.canUpdate, true);
    assert.equal(ability.canUpload, false);
    assert.equal(ability.canCreate, false);
    assert.equal(ability.canDelete, false);
    assert.equal(ability.canModify, false);
    assert.equal(ability.canEdit, false);
    assert.equal(ability.canForm, false);
    assert.equal(ability.canDetail, true);
    assert.equal(ability.canRead, true);
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

    assert.equal(ability.canViewHealth, false);
    assert.equal(ability.canViewState, true);
    assert.equal(ability.canSource, false);
    assert.equal(ability.canTransfer, false);
    assert.equal(ability.canMove, false);
    assert.equal(ability.canUpdate, true);
    assert.equal(ability.canUpload, true);
    assert.equal(ability.canCreate, true);
    assert.equal(ability.canDelete, true);
    assert.equal(ability.canModify, true);
    assert.equal(ability.canEdit, true);
    assert.equal(ability.canForm, false);
    assert.equal(ability.canDetail, true);
    assert.equal(ability.canRead, true);
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

    assert.equal(ability.canViewHealth, true);
    assert.equal(ability.canViewState, true);
    assert.equal(ability.canSource, false);
    assert.equal(ability.canTransfer, true);
    assert.equal(ability.canMove, true);
    assert.equal(ability.canUpdate, true);
    assert.equal(ability.canUpload, false);
    assert.equal(ability.canCreate, false);
    assert.equal(ability.canDelete, false);
    assert.equal(ability.canModify, false);
    assert.equal(ability.canEdit, false);
    assert.equal(ability.canForm, false);
    assert.equal(ability.canDetail, true);
    assert.equal(ability.canRead, true);
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
