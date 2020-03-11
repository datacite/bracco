import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
// import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Unit | Controller | dois', function(hooks) {
  setupTest(hooks);
  // setupFactoryGuy(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:dois');
    assert.ok(controller);
  });

  // promise error needs to be fixed
  /*
  test('should edit doi', function(assert) {
    let controller = this.owner.lookup('controller:dois.show.edit');
    let doi = make('doi');
    let store = this.owner.lookup('service:store');
    let originalSource = store.peekRecord('doi', 1).get('source');
    assert.equal(originalSource,'fabrica');
    controller.send('submit', doi);
    let targetSource = store.peekRecord('doi', 1).get('source');
    assert.equal(targetSource,'fabricaForm');
  });
  */

});
