import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';


module('Integration | Component | metrics counter', function(hooks) {
  setupRenderingTest(hooks);


  test('it renders no citations', async function(assert) {
    this.set('data', {viewCount: 232333});
    await render(hbs`{{metrics-counter label="View" orcid="0000-0002-4695-7874" data=data}}`);

    assert.dom('div#metrics-counter-doi').hasText('232.3K');
    assert.dom('h3.panel-title').hasText('Views total reported');
  });
});
