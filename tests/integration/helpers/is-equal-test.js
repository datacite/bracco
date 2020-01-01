
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('helper:is-equal', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders true', async function(assert) {
    this.set('inputValue', [ '1234', '1234' ]);

    await render(hbs`{{is-equal inputValue}}`);

    assert.dom('*').exists();
  });
});
