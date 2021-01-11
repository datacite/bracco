// import { hbs } from 'ember-cli-htmlbars';
import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
// import { render } from '@ember/test-helpers';
import { setupFactoryGuy } from 'ember-data-factory-guy';

module('Integration | Component | donut-chart', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  // test('it renders', async function (assert) {
  //   this.set('model', makeList('doi', 1));
  //   await render(hbs`
  //     <DonutChart @data={{this.model.resourceTypeCount}} @label="DOI" @model={{this.model}} @link="users.show.dois" />
  //   `);

  //   assert.dom('h3.panel-title').hasText('Charts by resource type');
  //   assert.dom('div.panel-body').hasText('0');
  // });
});
