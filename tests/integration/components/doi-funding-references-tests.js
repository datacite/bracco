import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render, fillIn, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | doi funding-references', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function(assert) {
    this.set('model', make('doi'));
    await render(hbs`{{doi-funding-references model=model}}`);
    await click('#add-funding-reference');
    let fundingReferences = this.element.querySelectorAll('input.funder-name-field');

    await fillIn(fundingReferences[0], 'Action for M.E.');

    assert.dom('[data-test-funder-name]').hasValue('Action for M.E.');
    assert.dom('[data-test-funder-identifier]').hasValue('501100001982');
    assert.dom('[data-test-funder-identifier-type]').includesText('Crossref fudner ID');
  });

  test('add multiple values', async function(assert) {
    this.set('model', make('doi'));
    await render(hbs`{{doi-funding-references model=model}}`);
    await click('#add-funding-reference');
    await click('#add-funding-reference');
    let fundingReferences = this.element.querySelectorAll('input.funder-name-field');

    await fillIn(fundingReferences[0], 'motzstrasse 56, berlin');
    await fillIn(fundingReferences[1], 'Chihuahahu, Mexico, 1890');

    assert.dom(fundingReferences[0]).hasValue('motzstrasse 56, berlin');
    assert.dom(fundingReferences[1]).hasValue('Chihuahahu, Mexico, 1890');
  });
});
