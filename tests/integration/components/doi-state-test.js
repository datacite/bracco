import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Integration | Component | doi-state', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    this.set('model', make('doi'));
    await render(hbs`{{doi-state model=this.model}}`);

    assert
      .dom('*')
      .hasText(
        "State The state determines whether a DOI is registered in the global Handle System and if its metadata is publicly available. Once in Registered or Findable state, a DOI cannot be deleted. Learn more … Draft the DOI is not yet registered in the global Handle System, does not need to have valid metadata or a URL, and can be deleted Registered the DOI is registered in the global Handle System, but the metadata is not publicly available Findable the DOI is registered in the global Handle System and the metadata is publicly available"
      );
  });
});
