import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import ENV from 'bracco/config/environment';

module('helper:orcid-url', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`{{orcid-url}}`);

    assert.dom().hasText(ENV.ORCID_URL);
  });
});
