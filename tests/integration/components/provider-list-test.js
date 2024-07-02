import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy } from 'ember-data-factory-guy';
import { render } from '@ember/test-helpers';

module('Integration | Component | provider-list', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    // Template block usage:
    await render(hbs`
      <ProviderList @model={{this.model}} @link="repositories.index">

      </ProviderList>
    `);

    assert.dom('*').hasText('No members found.');
  });
});
