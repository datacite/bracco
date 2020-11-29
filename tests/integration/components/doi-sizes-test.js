import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render, fillIn, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | doi sizes', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    this.set('model', make('doi'));
    await render(hbs`{{doi-sizes model=model}}`);
    await click('#toggle-sizes');
    await click('#add-size');
    let sizes = this.element.querySelectorAll('input.size-field');

    await fillIn(sizes[0], '3 pages');
    assert.dom(sizes[0]).hasValue('3 pages');
  });

  test('add multiple values', async function (assert) {
    this.set('model', make('doi'));
    await render(hbs`{{doi-sizes model=model}}`);
    await click('#toggle-sizes');
    await click('#add-size');
    await click('#add-size');
    let sizes = this.element.querySelectorAll('input.size-field');

    await fillIn(sizes[0], '5kb');
    await fillIn(sizes[1], '2 files');

    assert.dom(sizes[0]).hasValue('5kb');
    assert.dom(sizes[1]).hasValue('2 files');
  });
});
