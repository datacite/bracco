import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render, fillIn, click } from '@ember/test-helpers';

module('Integration | Component | doi related-identifiers', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    this.set('model', make('doi'));
    await render(hbs`{{doi-related-identifiers model=this.model}}`);
    await click('#add-related-identifier');
    let relatedIdentifiers = this.element.querySelectorAll(
      'input.related-identifier-field'
    );

    await fillIn(relatedIdentifiers[0], 'Chihuahahu, Mexico, 1890');
    assert.dom(relatedIdentifiers[0]).hasValue('Chihuahahu, Mexico, 1890');
  });

  test('add multiple values', async function (assert) {
    this.set('model', make('doi'));
    await render(hbs`{{doi-related-identifiers model=this.model}}`);
    await click('#add-related-identifier');
    await click('#add-related-identifier');
    let relatedIdentifiers = this.element.querySelectorAll(
      'input.related-identifier-field'
    );

    await fillIn(relatedIdentifiers[0], 'motzstrasse 56, berlin');
    await fillIn(relatedIdentifiers[1], 'Chihuahahu, Mexico, 1890');

    assert.dom(relatedIdentifiers[0]).hasValue('motzstrasse 56, berlin');
    assert.dom(relatedIdentifiers[1]).hasValue('Chihuahahu, Mexico, 1890');
  });
});
