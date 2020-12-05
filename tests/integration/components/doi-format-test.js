import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Integration | Component | doi-format', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    this.set('model', make('doi', { formats: ['tiff'] }));
    await render(hbs`
      <BsForm @model={{model}} as |form|>
        <DoiFormat @model={{model}} @fragment={{model.formats.[0]}} @form={{form}} @index={{0}}/>
      </BsForm>
    `);
    // TODO fix test
    assert.dom(this.element).hasText('');
  });
});
