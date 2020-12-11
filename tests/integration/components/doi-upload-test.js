import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Integration | Component | doi upload', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    this.set('model', make('doi'));
    await render(hbs`
      <BsForm @model={{model}} as |form|>
        <DoiUpload @model={{model}} @form={{form}} />
      </BsForm>
    `);

    assert
      .dom(this.element)
      .hasText(
        'Metadata Metadata that describe the resource. Upload File Upload a file with metadata in DataCite XML format, or one of the other supported formats. The DOI in the metadata will be replaced with the DOI in the DOI field if different.'
      );
  });
});
