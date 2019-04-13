import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | page-numbers', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Template block usage:
    await render(hbs`
      {{#page-numbers}}
        template block text
      {{/page-numbers}}
    `);

    assert.dom('*').hasText('« 1 »');
  });
});
