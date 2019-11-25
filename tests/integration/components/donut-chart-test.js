import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | donut-chart', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{donut-chart}}`);

    assert.dom('h3.panel-title').hasText('Charts by resource type');
    assert.dom('div.panel-body').hasText('0');
  });
});
