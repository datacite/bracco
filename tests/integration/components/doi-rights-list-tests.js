import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render, fillIn, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | doi rights-list', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function(assert) {
    this.set('model', make('doi'));
    await render(hbs`{{doi-rights-list model=model}}`);
    await click('#add-rights');
    let rightsArray = this.element.querySelectorAll('input.rights-field');

    await fillIn(rightsArray[0], 'Action for M.E.');

    assert.dom('[data-test-rights]').hasValue('Action for M.E.');
    assert.dom('[data-test-rights-identifier]').hasValue('501100001982');
  });

  test('add multiple values', async function(assert) {
    this.set('model', make('doi'));
    await render(hbs`{{doi-rights-list model=model}}`);
    await click('#add-rights');
    await click('#add-rights');
    let rightsArray = this.element.querySelectorAll('input.rights-field');

    await fillIn(rightsArray[0], 'motzstrasse 56, berlin');
    await fillIn(rightsArray[1], 'Chihuahahu, Mexico, 1890');

    assert.dom(rightsArray[0]).hasValue('motzstrasse 56, berlin');
    assert.dom(rightsArray[1]).hasValue('Chihuahahu, Mexico, 1890');
  });
});
