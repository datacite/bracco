import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { setupFactoryGuy, makeList, mockQuery } from 'ember-data-factory-guy';

module('Integration | Component | model search', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('search dois', async function (assert) {
    let dois = makeList('doi', 2);
    this.set(
      'model',
      mockQuery('doi', { query: 'chemical' }).returns({ models: dois })
    );

    await render(hbs`
      <ModelSearch @model={{model}} @query='chemical' @total={{2}} @sortable={{true}}>

      </ModelSearch>
    `);
    assert.dom(this.element).hasText('Search Reset All');
  });

  test('search providers', async function (assert) {
    let providers = makeList('provider', 2);
    this.set(
      'model',
      mockQuery('provider', { query: 'university' }).returns({
        models: providers
      })
    );

    await render(hbs`
      {{#model-search model=model name='Member' query='university' total=31 sortable=true}}

      {{/model-search}}
    `);
    assert.dom(this.element).hasText('Search Reset All');
  });

  test('search repositories', async function (assert) {
    let repositories = makeList('repository', 2);
    this.set(
      'model',
      mockQuery('repository', { query: 'university' }).returns({
        models: repositories
      })
    );

    await render(hbs`
      {{#model-search model=model name='Repository' query='university' total=22 sortable=true}}

      {{/model-search}}
    `);
    assert.dom(this.element).hasText('Search Reset All');
  });

  test('search prefixes', async function (assert) {
    let prefixes = makeList('prefix', 3);
    this.set(
      'model',
      mockQuery('prefix', { query: '10.5038' }).returns({
        models: prefixes
      })
    );

    await render(hbs`
      {{#model-search model=model name='Prefix' query='10.5038' total=3 sortable=true}}

      {{/model-search}}
    `);
    assert.dom(this.element).hasText('Search Reset All');
  });

  // test('search users', async function (assert) {
  //   this.set('model', makeList('user', 1));

  //   await render(hbs`
  //     {{#model-search model=model name='User' query='john' total=64 sortable=true}}

  //     {{/model-search}}
  //   `);
  //   assert
  //     .dom('*')
  //     .hasText(
  //       'Search Reset All Sort by Name Sort by Date Joined Sort by Relevance 64 Users'
  //     );
  // });
});
