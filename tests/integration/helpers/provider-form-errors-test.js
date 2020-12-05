import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render } from '@ember/test-helpers';

module('Integration | Helper | provider-form-errors', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    this.set('model', make('provider'));

    await render(hbs`{{provider-form-errors model}}`);

    assert
      .dom(this.element)
      .hasText(
        'member ID, confirm member ID, provider name, provider display name, system email'
      );
  });
});
