import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render, fillIn, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | doi formats', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function(assert) {
    this.set('model', make('doi'));
    await render(hbs`{{doi-formats model=model}}`);
    await click('#add-format');
    let formats = this.element.querySelectorAll('input.format-field');

    await fillIn(formats[0], 'doc/xml');
    assert.dom(formats[0]).hasValue('doc/xml');
  });

  test('add multiple values', async function(assert) {
    this.set('model', make('doi'));
    await render(hbs`{{doi-formats model=model}}`);
    await click('#add-format');
    await click('#add-format');
    let formats = this.element.querySelectorAll('input.format-field');

    await fillIn(formats[0], 'jpeg');
    await fillIn(formats[1], 'png');

    assert.dom(formats[0]).hasValue('jpeg');
    assert.dom(formats[1]).hasValue('png');
  });
});
