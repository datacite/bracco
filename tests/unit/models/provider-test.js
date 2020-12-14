import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { get } from '@ember/object';
import { run } from '@ember/runloop';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

let model;

module('Unit | Model | provider', function (hooks) {
  setupTest(hooks);
  setupFactoryGuy(hooks);

  test('it exists', function (assert) {
    model = run(() =>
      this.owner.lookup('service:store').createRecord('provider')
    );
    assert.ok(!!model);
  });

  test('should belong to consortium', function (assert) {
    const Provider = this.owner.lookup('service:store').modelFor('provider');

    // lookup the relationship on the consortium model
    /* eslint-disable-next-line ember/no-get */
    const relationship = get(Provider, 'relationshipsByName').get('consortium');

    assert.equal(
      relationship.key,
      'consortium',
      'has relationship with consortium'
    );
    assert.equal(
      relationship.kind,
      'belongsTo',
      'kind of relationship is belongsTo'
    );
  });

  test('should have many consortium organizations', function (assert) {
    const Provider = this.owner.lookup('service:store').modelFor('provider');

    // lookup the relationship on the consortiumOrganization model
    /* eslint-disable-next-line ember/no-get */
    const relationship = get(Provider, 'relationshipsByName').get(
      'consortiumOrganizations'
    );

    assert.equal(
      relationship.key,
      'consortiumOrganizations',
      'has relationship with consortiumOrganizations'
    );
    assert.equal(
      relationship.kind,
      'hasMany',
      'kind of relationship is hasMany'
    );
  });

  test('should validate password', function (assert) {
    model = make('provider', {
      symbol: 'BL',
      confirmSymbol: 'BL',
      name: 'British Library',
      displayName: 'British Library',
      systemEmail: 'services@ardc.edu.au'
    });
    assert.equal(model.validations.errors.mapBy('attribute').join(', '), '');

    model = make('provider', {
      symbol: null,
      confirmSymbol: 'BL',
      name: 'British Library',
      displayName: 'British Library',
      systemEmail: 'services@ardc.edu.au',
      passwordInput: null,
      confirmPasswordInput: null,
      keepPassword: false
    });
    assert.equal(
      model.validations.errors.mapBy('attribute').join(', '),
      'symbol, confirmSymbol, passwordInput, confirmPasswordInput'
    );
  });

  test('should compute uid', function (assert) {
    model = make('provider', { id: 'bl' });
    assert.equal(model.uid, 'BL');
  });

  test('should compute formattedBillingInformation', function (assert) {
    model = make('provider', {
      billingInformation: {
        address: '1600 Amphitheatre Parkway',
        city: 'Mountain View',
        postCode: '94043',
        state: { name: 'CA' },
        country: { name: 'United States', code: 'US' }
      }
    });
    assert.equal(
      model.formattedBillingInformation.join('\n'),
      '1600 Amphitheatre Parkway\nMountain View, CA 94043\nUnited States of America'
    );

    // new model as computed values are cached
    model = make('provider', {
      billingInformation: {
        address: 'Fakturamottak DFØ, Postboks 4746 Torgarden',
        city: 'Trondheim',
        postCode: '7468',
        country: { name: 'Norway', code: 'NO' }
      }
    });
    assert.equal(
      model.formattedBillingInformation.join('\n'),
      'Fakturamottak DFØ, Postboks 4746 Torgarden\n7468 Trondheim\nNorway'
    );

    // new model as computed values are cached
    model = make('provider', {
      billingInformation: {
        address: 'Fakturamottak DFØ, Postboks 4746 Torgarden',
        city: 'Trondheim',
        postCode: '7468'
      }
    });
    assert.equal(
      model.formattedBillingInformation.join('\n'),
      'Fakturamottak DFØ, Postboks 4746 Torgarden\n7468 Trondheim'
    );

    model = make('provider', { billingInformation: null });
    assert.equal(model.formattedBillingInformation, null);
  });
});
