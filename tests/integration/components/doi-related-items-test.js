import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render, fillIn, click } from '@ember/test-helpers';

import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | doi related items', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    this.set('model', make('doi', { relatedItems: [] }));
    await render(hbs`{{doi-related-items model=this.model}}`);
    await click('#add-related-item');
    let relatedItemTitles = this.element.querySelectorAll(
      '[data-test-related-item-title]'
    );

    await fillIn(relatedItemTitles[0], 'High Energy Particle Physics');

    assert
      .dom('[data-test-related-item-title]')
      .hasValue('High Energy Particle Physics');
  });

  test('add multiple related items', async function (assert) {
    this.set('relatedItem', make('relatedItem'));
    this.set('model', make('doi'));
    this.set('model.relatedItems', [this.relatedItem]);
    await render(hbs`{{doi-related-items model=this.model}}`);
    await click('#toggle-related-items');
    await click('#add-related-item');

    let relatedItemTitles = this.element.querySelectorAll(
      '[data-test-related-item-title]'
    );
    await fillIn(relatedItemTitles[1], 'High Energy Particle Physics');
    assert.dom(relatedItemTitles[1]).hasValue('High Energy Particle Physics');
  });

  test('add related item with contributor and creator', async function (assert) {
    this.set('relatedItem', make('relatedItem'));
    this.set('model', make('doi'));
    this.set('model.relatedItems', [this.relatedItem]);
    await render(hbs`{{doi-related-items model=this.model}}`);
    await click('#toggle-related-items');
    await click('#add-related-item');

    let relatedItemTitles = this.element.querySelectorAll(
      '[data-test-related-item-title]'
    );
    await fillIn(relatedItemTitles[1], 'High Energy Particle Physics');
    assert.dom(relatedItemTitles[1]).hasValue('High Energy Particle Physics');

    await click('#add-related-item-creator');

    let relatedItemCreatorNames = this.element.querySelectorAll(
      '[data-test-related-item-creator-name]'
    );
    await fillIn(relatedItemCreatorNames[0], 'Prine, John');
    assert.dom(relatedItemCreatorNames[0]).hasValue('Prine, John');

    await click('#add-related-item-contributor');

    let relatedItemContributorNames = this.element.querySelectorAll(
      '[data-test-related-item-contributor-name]'
    );
    await fillIn(relatedItemContributorNames[0], 'Burns, Jethro');
    assert.dom(relatedItemContributorNames[0]).hasValue('Burns, Jethro');
  });
});
