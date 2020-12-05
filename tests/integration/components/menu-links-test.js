import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';

module('Integration | Component | menu-links', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`{{menu-links}}`);
    assert.ok(
      /^Services+/.test(find('*').textContent.trim()),
      'begins with Services'
    );
  });
});
