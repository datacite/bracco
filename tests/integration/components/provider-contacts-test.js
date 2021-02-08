import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | provider-contacts', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    this.set('model', make('provider'));

    await render(hbs`{{provider-contacts model=model}}`);

    assert
      .dom('*')
      .containsText(
        'Contact Information Voting Representative Please provide this information. Service Contact Please provide this information. Billing Contact Please provide this information.'
      );
  });
});
