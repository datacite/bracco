import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy } from 'ember-data-factory-guy';
import { render } from '@ember/test-helpers';

module('Integration | Component | provider-list', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    await render(hbs`
      {{#provider-list model=model link="repositories.index"}}

      {{/provider-list}}
    `);

    assert.dom(this.element).hasText('No members found.');
  });
});
