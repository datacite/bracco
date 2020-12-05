import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { setupFactoryGuy, makeList } from 'ember-data-factory-guy';

module('Integration | Component | doi-list', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    // model is list of DOIs
    this.set('model', makeList('doi', 1));
    await render(hbs`{{doi-list model=model}}`);

    assert.dom('[data-test-doi]').includesText(this.model[0].doi);
    assert.dom('[data-test-resource-type-general]').hasText('Dataset');
    assert
      .dom('[data-test-metadata]')
      .hasText(
        'Version 7 of Substance published 2017 via Royal Society of Chemistry'
      );
    assert
      .dom('[data-test-created]')
      .hasText('Created September 27, 2017, 14:08:02 UTC. Findable');
    assert
      .dom('[data-test-identifier]')
      .hasText('https://handle.stage.datacite.org/' + this.model[0].doi);
  });
});
