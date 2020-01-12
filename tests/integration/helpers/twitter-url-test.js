import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | twitter-url', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('inputValue', '@datacite');

    await render(hbs`{{twitter-url inputValue}}`);

    assert.equal(this.element.textContent.trim(), 'https://twitter.com/datacite');
  });
});
