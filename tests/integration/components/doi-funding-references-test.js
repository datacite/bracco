import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render, fillIn, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | doi funding-references', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    this.set('model', make('doi', { fundingReferences: [] }));
    await render(hbs`{{doi-funding-references model=model}}`);
    await click('#add-funding-reference');
    let fundingReferences = this.element.querySelectorAll(
      '[data-test-funder-identifier]'
    );

    await fillIn(fundingReferences[0], 'Adobe-Glyph');

    assert.dom('[data-test-funder-identifier]').hasValue('Adobe-Glyph');
  });

  test('add multiple values', async function (assert) {
    this.set('model', make('doi', { fundingReferences: [] }));
    await render(hbs`{{doi-funding-references model=model}}`);
    await click('#add-funding-reference');
    await click('#add-funding-reference');
    let fundingReferences = this.element.querySelectorAll(
      '[data-test-award-number]'
    );

    await fillIn(fundingReferences[0], '234432');
    await fillIn(fundingReferences[1], '1890');

    assert.dom(fundingReferences[0]).hasValue('234432');
    assert.dom(fundingReferences[1]).hasValue('1890');
  });
});
