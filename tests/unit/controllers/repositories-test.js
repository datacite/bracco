import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | repositories', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:repositories');
    assert.ok(controller);
  });

  test('should list organisation type list', function (assert) {
    let controller = this.owner.lookup(
      'controller:repositories.show.transfer-repository'
    );
    assert.ok(controller);
  });

  test('createSoftwareOnEnter sets a custom software name', function (assert) {
    let controller = this.owner.lookup('controller:repositories.show.edit');
    let model = this.owner
      .lookup('service:store')
      .createRecord('repository');
    controller.set('model', model);

    let chosen = null;
    let preventDefaultCalled = false;
    controller.send('createSoftwareOnEnter', {
      isOpen: true,
      highlighted: null,
      searchText: 'NADA',
      actions: {
        choose(value) {
          chosen = value;
        }
      }
    }, {
      keyCode: 13,
      preventDefault() {
        preventDefaultCalled = true;
      }
    });

    assert.equal(model.get('software'), 'NADA');
    assert.equal(chosen, 'NADA');
    assert.true(preventDefaultCalled);
  });
});
