import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { run } from '@ember/runloop';

module('Unit | Model | client', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let model = run(() => this.owner.lookup('service:store').createRecord('client'));
    // let store = this.store();
    assert.ok(!!model);
  });

  // test('should correctly compute domainList', function(assert) {
  //   let model = this.subject();
  //   model.set('domains', 'datacite.org, datacite.de, datacite.fr');
  //
  //   assert.equal(model.get('domainList'), 'computed baz');
  // });
});
