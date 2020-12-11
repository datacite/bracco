import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';

module('Integration | Component | list-links', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.set('links', [{ url: 'http://example.com', name: 'Example' }]);

    await render(hbs`
      <ListLinks @links={{links}} />
    `);

    assert.ok(
      /^Example+/.test(find('*').textContent.trim()),
      'begins with "Example"'
    );
  });
});
