import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { run } from '@ember/runloop';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Unit | Model | contact', function(hooks) {
  setupTest(hooks);
  setupFactoryGuy(hooks);

  test('it exists', function(assert) {
    let model = run(() => this.owner.lookup('service:store').createRecord('contact'));
    assert.ok(!!model);
  });

  test('should correct contact name', function(assert) {
    let model = run(() => this.owner.lookup('service:store').createRecord('contact'));
    const contact = make('contact');
    model.set('givenName', contact.givenName);
    model.set('familyName', contact.familyName);
    assert.equal(model.get('name'), 'John Smith');
  });
});