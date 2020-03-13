import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Unit | Controller | providers', function(hooks) {
  setupTest(hooks);
  setupFactoryGuy(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:providers');
    assert.ok(controller);
  });

  test('should list countries', function(assert) {
    let controller = this.owner.lookup('controller:providers.show.organizations.new');
    let providerModel = make('provider');
    let orgModel = make('provider'); // make('organisation') does not work

    let model = {
      'provider': providerModel,
      'organization': orgModel,
    };
    controller.set('model', model);
    controller.send('selectCountry', 'Australia');
    assert.equal(controller.model.organization.get('country'), 'Australia');
    controller.send('searchCountry', 'Australia');
    assert.equal(controller.get('countries').length,1);
  });

  test('should list organisation type list', function(assert) {
    let controller = this.owner.lookup('controller:providers.show.organizations.new');
    let providerModel = make('provider');
    let orgModel = make('provider'); // make('organisation') does not work

    let model = {
      'provider': providerModel,
      'organization': orgModel,
    };
    controller.set('model', model);
    controller.send('selectOrganizationType', 'nationalInstitution');
    assert.equal(controller.model.organization.get('organizationType'), 'nationalInstitution');
    controller.send('searchOrganizationType', 'National Institution');
    assert.equal(controller.get('organizationTypes').length,1);
  });

  test('should list member type list', function(assert) {
    let controller = this.owner.lookup('controller:providers.show.organizations.new');
    let model = {
      'provider': make('provider'),
      'organization': make('provider'),
    };
    controller.set('model', model);
    controller.send('selectMemberType', 'direct_member');
    assert.equal(controller.model.organization.get('memberType'), 'direct_member');
    controller.send('searchMemberType', 'direct_member');
    console.log(controller.get('memberTypes'));
    assert.equal(controller.get('memberTypes').length,1);
  });
});
