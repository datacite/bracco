import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render } from '@ember/test-helpers';

module('Integration | Component | doi summary', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    this.set('model', make('doi'));
    await render(hbs`{{doi-summary model=this.model}}`);

    assert.dom('[data-test-doi]').hasText('10.80225/rph240519');
    assert.dom('[data-test-resource-type-general]').hasText('Dataset');
    assert
      .dom('[data-test-metadata]')
      .hasText(
        'Version 7 of Substance published 2017 via Royal Society of Chemistry'
      );
  });

  test('it renders citations', async function (assert) {
    this.set('model', make('doi'));
    await render(hbs`{{doi-summary isResearcherProfile=true model=this.model}}`);

    assert.dom('[citations-test-badge]').hasText('  123 Citations');
  });

  test('it renders 0 citations', async function (assert) {
    this.set('model', make('doi', { citationCount: 0 }));
    await render(hbs`{{doi-summary isResearcherProfile=true model=this.model}}`);

    assert
      .dom('[citations-test-badge]')
      .hasText('  No citations were reported.');
  });
});
