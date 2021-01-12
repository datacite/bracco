import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import Service from '@ember/service';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Unit | Ability | prefix', function (hooks) {
  setupTest(hooks);
  setupFactoryGuy(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let ability = this.owner.lookup('ability:prefix');
    assert.ok(ability);
  });

  test('role staff_admin', function (assert) {
    const ability = this.owner.lookup('ability:prefix');
    const currentUser = Service.extend({
      uid: 'admin',
      name: 'Admin',
      role_id: 'staff_admin'
    });
    this.owner.register('service:current-user', currentUser);

    assert.equal(ability.canWrite, true);
    assert.equal(ability.canUpdate, true);
    assert.equal(ability.canRead, true);
  });

  test('role provider_admin', function (assert) {
    const ability = this.owner.lookup('ability:prefix');
    const currentUser = Service.extend({
      uid: 'ands',
      name: 'Australian National Data Service',
      role_id: 'provider_admin',
      provider_id: 'ands'
    });
    this.owner.register('service:current-user', currentUser);

    this.set('model', make('ands'));
    ability.model = this.model;

    assert.equal(ability.canWrite, false);
    assert.equal(ability.canUpdate, false);
    assert.equal(ability.canRead, true);
  });

  test('role client_admin', function (assert) {
    const ability = this.owner.lookup('ability:prefix');
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

    assert.equal(ability.canWrite, false);
    assert.equal(ability.canUpdate, false);

    // make this work. model.repositories is undefined
    // assert.equal(ability.canRead, true);
  });

  test('role consortium_admin', function (assert) {
    const ability = this.owner.lookup('ability:prefix');
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

    assert.equal(ability.canWrite, false);
    assert.equal(ability.canUpdate, false);
    assert.equal(ability.canRead, true);
  });
});
