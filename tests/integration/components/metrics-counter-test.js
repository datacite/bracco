import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';


module('Integration | Component | metrics counter', function(hooks) {
  setupRenderingTest(hooks);


  test('it renders no citations', async function(assert) {
    await render(hbs`{{metrics-counter label="Views" orcid="0000-0002-4695-7874"}}`);

    assert.dom('div#metrics-counter-doi').hasText('0');
    assert.dom('h3.panel-title').hasText('Views');
  });
});

