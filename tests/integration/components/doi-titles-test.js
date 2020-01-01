import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render, click, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | doi titles', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function(assert) {
    this.set('model', make('doi'));
    await render(hbs`{{doi-titles model=model}}`);
    await click('#add-title');
    let titles = this.element.querySelectorAll('input.title-field');

    await fillIn(titles[0], 'Abhinandan: Crowds gather for Indian pilots release');
    assert.dom('input.title-field').hasValue('Abhinandan: Crowds gather for Indian pilots release');
  });

  test('add multiple titles', async function(assert) {
    this.set('model', make('doi'));
    await render(hbs`{{doi-titles model=model}}`);
    await click('#add-title');
    await click('#add-title');
    let titles = this.element.querySelectorAll('input.title-field');

    await fillIn(titles[0], 'Abhinandan: Crowds gather for Indian pilots release');
    await fillIn(titles[1], 'Praesent quis blandit odio. Donec justo ex, ');

    assert.dom(titles[0]).hasValue('Abhinandan: Crowds gather for Indian pilots release');
    assert.dom(titles[1]).hasValue('Praesent quis blandit odio. Donec justo ex, ');
    assert.equal(titles[0].className, 'form-control title-field');
    assert.equal(titles[1].className, 'form-control title-field no-error no-success');
  });

  test('no titles', async function(assert) {
    this.set('model', make('doi'));
    await render(hbs`{{doi-titles model=model}}`);
    await click('#add-title');
    let titles = this.element.querySelector('input.title-field');

    assert.dom(titles).hasNoValue();
    assert.equal(titles.className, 'form-control title-field');
  });
});
