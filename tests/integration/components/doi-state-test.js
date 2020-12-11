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
    await render(hbs`
      <BsForm @model={{model}} as |form|>
        <DoiState @model={{model}} @form={{form}} />
      </BsForm>
    `);

    assert
      .dom('*')
      .hasText(
        "State The state determines whether a DOI is registered and findable. Once in Registered or Findable state, a DOI can't be set back to Draft state. More … Draft only visible in Fabrica, DOI can be deleted Registered registered with the DOI Resolver Findable registered with the DOI Resolver and indexed in DataCite Search"
      );
  });
});
