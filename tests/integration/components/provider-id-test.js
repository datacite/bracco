import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | provider-id', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    this.set('model', make('provider'));

    await render(hbs`{{provider-id model=this.model}}`);

    assert
      .dom(this.element)
      .hasText(
        'Click the refresh icon for a new random ID, or the cross icon to delete the random ID and enter a value manually.'
      );
  });
});
