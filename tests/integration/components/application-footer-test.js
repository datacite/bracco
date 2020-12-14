import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Component | application-footer', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`
      <ApplicationFooter />
    `);

    assert.dom('[data-test-about-column] h4').hasText('About DataCite');
    assert.dom('[data-test-services-column] h4').hasText('Services');
    assert.dom('[data-test-resources-column] h4').hasText('Resources');
    assert.dom('[data-test-contact-column] h4').hasText('Contact us');
  });
});
