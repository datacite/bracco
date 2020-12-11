import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Component | cc-license', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.set(
      'licenseUrl',
      'http://creativecommons.org/licenses/by-nc/4.0/legalcode'
    );

    await render(hbs`
      <CcLicense @licenseURL={{licenseUrl}} />
    `);

    // logos for cc, by and nc
    assert
      .dom('a')
      .hasAttribute(
        'href',
        'http://creativecommons.org/licenses/by-nc/4.0/legalcode'
      );
    assert.dom('a i').exists({ count: 3 });
  });
});
