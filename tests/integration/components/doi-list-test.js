import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Integration | Component | doi-list', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function(assert) {
    // model is list of DOIs
    this.set('model', [make('doi')]);
    await render(hbs`{{doi-list model=model}}`);

    assert.dom('*').hasText('Search Reset All ' + this.model[0].doi + ' Dataset Substance published 2017 via Royal Society of Chemistry Created September 27, 2017, 14:08:02 UTC. Searchable https://handle.test.datacite.org/' + this.model[0].doi);
  });
});
