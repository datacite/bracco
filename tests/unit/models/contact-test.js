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
    this.set('contact', make('contact'));
    const contact = run(() => this.owner.lookup('service:store').first);
    assert.equal(contact.name, 'John Smith', 'name is John Smith');
  });
});