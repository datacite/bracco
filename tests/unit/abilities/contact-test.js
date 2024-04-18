import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import Service from '@ember/service';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Unit | Ability | contact', function (hooks) {
  setupTest(hooks);
  setupFactoryGuy(hooks);

  test('it exists', function (assert) {
    let ability = this.owner.lookup('ability:contact');
    assert.ok(ability);
  });

  test('role staff_admin', function (assert) {
    const ability = this.owner.lookup('ability:contact');
    const currentUser = Service.extend({
      uid: 'admin',
      name: 'Admin',
      role_id: 'staff_admin'
    });
    this.owner.register('service:current-user', currentUser);

    assert.true(ability.canCreate);
    assert.true(ability.canDelete);
    assert.true(ability.canUpdate);
    assert.true(ability.canRead);
  });

  test('role provider_admin', function (assert) {
    const ability = this.owner.lookup('ability:contact');
    const currentUser = Service.extend({
      uid: 'ands',
      name: 'Australian National Data Service',
      role_id: 'provider_admin',
      provider_id: 'ands'
    });
    this.owner.register('service:current-user', currentUser);

    this.set('provider', make('ands'));
    this.set('model', make('contact', { provider: this.provider }));
    ability.model = this.model;

    assert.true(ability.canCreate);
    assert.true(ability.canDelete);
    assert.true(ability.canUpdate);
    assert.true(ability.canRead);
  });

  test('role client_admin', function (assert) {
    const ability = this.owner.lookup('ability:contact');
    const currentUser = Service.extend({
      uid: 'ands.centre9',
      name: 'Australian Data Archive',
      role_id: 'client_admin',
      client_id: 'ands.centre9'
    });
    this.owner.register('service:current-user', currentUser);

    this.set('provider', make('ands'));
    this.set('model', make('contact', { provider: this.provider }));
    ability.model = this.model;

    assert.false(ability.canCreate);
    assert.false(ability.canDelete);
    assert.false(ability.canUpdate);
    assert.false(ability.canRead);
  });
});
