import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, fillIn, render } from '@ember/test-helpers';
import EmberObject from '@ember/object';
import Service from '@ember/service';

class RouterStub extends Service {
  transitionTo() {}
}

module('Integration | Component | model-search', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('service:router', RouterStub);
    this.model = EmberObject.create({
      query: EmberObject.create({
        query: null,
        sort: null,
        page: 1,
        size: 25
      }),
      meta: EmberObject.create({
        total: 2
      }),
      modelName: 'doi'
    });
  });

  test('it renders accessible labels for search and sort controls', async function (assert) {
    await render(hbs`<ModelSearch @model={{this.model}} @sortable={{true}} @link="dois" @name="DOI" />`);

    assert.dom('label[for="query"]').exists();
    assert.dom('#query').hasAttribute('aria-label');
    assert.dom('label[for="sort-results"]').exists();
    assert.dom('#sort-results').hasAttribute('aria-label');
  });

  test('it renders clear control as a button', async function (assert) {
    await render(hbs`<ModelSearch @model={{this.model}} @sortable={{true}} @link="dois" @name="DOI" />`);

    await fillIn('#query', 'climate');

    assert.dom('#search-clear').hasAttribute('type', 'button');
    await click('#search-clear');
    assert.dom('#query').hasValue('');
  });
});
