import { moduleForModel, test } from 'ember-qunit';

moduleForModel('client', 'Unit | Model | client', {
  needs: ['validator:presence', 'validator:confirmation', 'validator:format', 'validator:length', 'validator:client-id', 'validator:unique-client-id']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

// test('should correctly compute domainList', function(assert) {
//   let model = this.subject();
//   model.set('domains', 'datacite.org, datacite.de, datacite.fr');
//
//   assert.equal(model.get('domainList'), 'computed baz');
// });
