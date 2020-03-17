import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import Service from '@ember/service';

module('Unit | Ability | doi', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let ability = this.owner.lookup('ability:doi');
    assert.ok(ability);
  });

  test('it canViewHealth', function(assert) {
    let ability = this.owner.lookup('ability:doi');
    const currentUser = Service.extend({
      uid: 'tib.awi',
      name: 'Alfred Wegener Institute',
      role_id: 'client_admin',
      provider_id: 'tib',
      client_id: 'tib.awi',
    });
    this.owner.register('service: ', currentUser);
    console.log(ability.currentUser);
    assert.equal(ability.canViewHealth, true);
    assert.equal(ability.canViewState, true);
  });
});
