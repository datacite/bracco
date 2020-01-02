import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, makeList } from 'ember-data-factory-guy';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | repository-list', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function(assert) {
    this.set('model', { provider: null, repositories: makeList('repository', 2) });

    await render(hbs`{{repository-list model=model link="repositories" searchable=false}}`);

    assert.dom('div.panel-body > h3.work a').exists({ count: 2 });
    assert.dom('div.panel-body:first-child a').hasText('Australian Data Archive');
  });
});
