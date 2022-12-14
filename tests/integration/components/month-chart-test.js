import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { skip } from 'ember-qunit';

module('Integration | Component | month-chart', function (hooks) {
  setupRenderingTest(hooks);

  skip('it renders', async function (assert) {
    await render(hbs`{{month-chart}}`);

    assert.dom('h3.panel-title').hasText('Charts by month');
    assert.dom('div.panel-body').hasText('0 January 2012NaN');
  });
});
