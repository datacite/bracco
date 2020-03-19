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
    let model = {
      'provider': make('provider'),
      'organization': make('provider', { memberType: 'direct_member' }),
    };
    controller.set('model', model);
    controller.send('selectCountry', 'Australia');
    assert.equal(controller.model.organization.get('country'), 'Australia');
    controller.send('searchCountry', 'Australia');
    assert.equal(controller.get('countries').length,1);
  });

  test('should list organisation type list', function(assert) {
    let controller = this.owner.lookup('controller:providers.show.organizations.new');

    let model = {
      'provider': make('provider'),
      'organization': make('provider', { memberType: 'direct_member' }),
    };
    controller.set('model', model);
    controller.send('selectOrganizationType', 'nationalInstitution');
    assert.equal(controller.model.organization.get('organizationType'), 'nationalInstitution');
    controller.send('searchOrganizationType', 'National');
    assert.equal(controller.get('organizationTypes').length,1);
  });

  test('should list member type list', function(assert) {
    let controller = this.owner.lookup('controller:providers.show.organizations.new');
    let model = {
      'provider': make('provider'),
      'organization': make('provider', { memberType: 'direct_member' }),
    };
    controller.set('model', model);
    controller.send('selectMemberType', 'direct_member');
    assert.equal(controller.model.organization.get('memberType'), 'direct_member');
    controller.send('searchMemberType', 'direct_member');
    assert.equal(controller.get('memberTypes').length,1);
  });

  test('should list focus area list', function(assert) {
    let controller = this.owner.lookup('controller:providers.show.organizations.new');
    let model = {
      'provider': make('provider'),
      'organization': make('provider', { memberType: 'direct_member' }),
    };
    controller.set('model', model);
    controller.send('selectFocusArea', 'general');
    assert.equal(controller.model.organization.get('focusArea'), 'general');
    controller.send('searchFocusArea', 'general');
    assert.equal(controller.get('focusAreas').length,1);
  });

  test('should list non profit status list', function(assert) {
    let controller = this.owner.lookup('controller:providers.show.organizations.new');
    let model = {
      'provider': make('provider'),
      'organization': make('provider', { memberType: 'direct_member' }),
    };
    controller.set('model', model);
    controller.send('selectFocusArea', 'general');
    assert.equal(controller.model.organization.get('focusArea'), 'general');
    controller.send('searchFocusArea', 'general');
    assert.equal(controller.get('focusAreas').length,1);
  });

  // I don't know how to test for consortium either
  // test('should list consortium', function(assert) {
  //   let controller = this.owner.lookup('controller:providers.show.organizations.new');
  //   let model = {
  //     'provider': make('provider'),
  //     'organization': make('provider', { memberType: 'consortium_organization' }),
  //   };
  //   controller.set('model', model);
  //   controller.send('searchConsortium', '');
  //   assert.equal(controller.model.organization.get('consortia'), '');
  //   controller.send('selectConsortium', '');
  //   assert.equal(controller.get('consortium').length,1);
  // });

  // test('should list ror id', function(assert) {
  //   let controller = this.owner.lookup('controller:providers.show.organizations.new');
  //   let model = {
  //     'provider': make('provider'),
  //     'organization': make('provider', { memberType: 'consortium_organization' }),
  //   };
  //   let ror = {
  //     'id': 'https://ror.org/038sjwq14',
  //     'name': 'Australian Research Data Commons',
  //     'displayName': 'Australian Research Data Commons',
  //   };
  //   controller.set('model', model);
  //   controller.send('searchRor', ror.name); // what should be sent here
  //   assert.equal(controller.model.organization.get('organizations'), '');
  //   controller.send('selectRor', ror);
  //   assert.equal(controller.get('organizations').length,0); // why is organisations set to 0
  // });
});
