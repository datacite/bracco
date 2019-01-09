import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | cc license', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('licenseURL', 'http://creativecommons.org/licenses/by-nc/4.0/legalcode');

    await render(hbs`{{cc-license licenseURL=licenseURL}}`);

    // logos for cc, by and nc
    assert.dom('i').exists({ count: 3 });
  });
});
