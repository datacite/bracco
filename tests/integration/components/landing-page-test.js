import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | landing page', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{landing-page}}`);

    assert.ok(/^DataCite DOI Fabrica+/.test(find('*').textContent.trim()), 'begins with "DataCite DOI Fabrica"');

    // Template block usage:
    await render(hbs`
      {{#landing-page}}

      {{/landing-page}}
    `);

    assert.ok(/^DataCite DOI Fabrica+/.test(find('*').textContent.trim()), 'begins with "DataCite DOI Fabrica"');
  });
});
