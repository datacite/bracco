import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Integration | Component | metrics counter', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders no citations', async function (assert) {
    this.set('model', make('creator'));
    this.set('count', 232333);
    this.set('link', 'users.show.dois');
    this.set('query', { 'has-views': true });

    await render(
      hbs`{{metrics-counter label="Views" model=model count=count link=link query=query}}`
    );

    assert.dom('div#metrics-counter-doi').hasText('232.3K');
    assert.dom('h3.panel-title').hasText('Views total');
  });
});
