import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';

module('Integration | Component | landing page', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`{{landing-page}}`);

    assert.ok(
      /^DataCite Fabrica+/.test(find('*').textContent.trim()),
      'begins with "DataCite Fabrica"'
    );
    assert.dom('.landing-page .motto h1').exists();
    assert.dom('.landing-page .landing-feature-title').exists({ count: 3 });
    assert.dom('.landing-page .a11y-inline-link').exists({ count: 5 });

    // Template block usage:
    await render(hbs`
      <LandingPage>

      </LandingPage>
    `);

    assert.ok(
      /^DataCite Fabrica+/.test(find('*').textContent.trim()),
      'begins with "DataCite Fabrica"'
    );
  });
});
