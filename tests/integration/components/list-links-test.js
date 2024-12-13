import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';

module('Integration | Component | list-links', function (hooks) {
  setupRenderingTest(hooks);

  test.skip('it renders', async function (assert) {
    this.set('listLinks', [{ url: 'http://example.com', name: 'Example' }]);

    await render(hbs`{{list-links links=this.listLinks}}`);
    assert.ok(
      /^Example+/.test(find('*').textContent.trim()),
      'begins with "Example"'
    );
  });
});
