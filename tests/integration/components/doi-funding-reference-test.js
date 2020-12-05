import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
// import { selectChoose } from 'ember-power-select/test-support';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Integration | Component | doi funding-reference', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    this.set('model', make('doi'));
    this.set('fragment', make('fundingReference'));
    await render(
      hbs`{{doi-funding-reference model=model fragment=fragment index=0}}`
    );

    assert
      .dom('*')
      .hasText(
        'Funder Name Funder Identifier Uniquely identifies a funding entity. Funder Identifier Type Award Number The code assigned by the funder to a sponsored award (grant). Award Title The human readable title or name of the award (grant). Award URI The URI leading to a page provided by the funder for more information about the award (grant). For example, https://www.moore.org/grants/list/GBMF3859.01 .'
      );
  });
});
