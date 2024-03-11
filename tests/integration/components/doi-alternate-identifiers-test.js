import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render, fillIn, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | doi alternate-identifiers', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    this.set('model', make('doi'));
    await render(hbs`{{doi-alternate-identifiers model=model}}`);
    await click('#toggle-alternate-identifiers');
    await click('#add-alternate-identifier');
    let alternateIdentifier = this.element.querySelectorAll(
      'input.alternate-identifier-field'
    );

    await fillIn(alternateIdentifier[0], 'doi.org/10.223/34gfdkhjr');
    assert.dom(alternateIdentifier[0]).hasValue('doi.org/10.223/34gfdkhjr');
  });

  test('add multiple values', async function (assert) {
    this.set('model', make('doi'));
    await render(hbs`{{doi-alternate-identifiers model=model}}`);
    await click('#toggle-alternate-identifiers');
    await click('#add-alternate-identifier');
    await click('#add-alternate-identifier');
    let alternateIdentifier = this.element.querySelectorAll(
      'input.alternate-identifier-field'
    );

    await fillIn(alternateIdentifier[0], 'doi.org/10.223/34gfdkhjr');
    await fillIn(alternateIdentifier[1], 'doi.org/10.223/34gfdkhjr4');

    assert.dom(alternateIdentifier[0]).hasValue('doi.org/10.223/34gfdkhjr');
    assert.dom(alternateIdentifier[1]).hasValue('doi.org/10.223/34gfdkhjr4');
  });
});
