import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | prefix show', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Template block usage:
    await render(hbs`
      {{#prefix-show}}
        template block text
      {{/prefix-show}}
    `);

    assert.dom('*').hasText('Providers No providers found. Repositories No repositories found.');
  });
});
