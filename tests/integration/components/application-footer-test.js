import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Component | application footer', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders accessible social links', async function (assert) {
    await render(hbs`<ApplicationFooter />`);

    assert.dom('.footer h2.footer-heading').exists({ count: 5 });
    assert.dom('a[aria-label="DataCite on GitHub"]').exists();
    assert.dom('a[aria-label="DataCite on LinkedIn"]').exists();
    assert.dom('a[aria-label="DataCite on YouTube"]').exists();
    assert.dom('a[aria-label="DataCite on X"]').exists();
    assert.dom('a[aria-label="DataCite on Mastodon"]').exists();
  });
});
