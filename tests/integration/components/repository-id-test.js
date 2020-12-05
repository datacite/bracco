import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render } from '@ember/test-helpers';

module('Integration | Component | repository-id', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    this.set('model', make('repository'));
    this.set('provider', make('provider'));

    await render(hbs`
      <BsForm @model={{model}} as |form|>
        <RepositoryId @model={{model}} @provider={{provider}} @form={{form}} />
      </BsForm>
    `);

    assert
      .dom(this.element)
      .hasText(
        "Click the circle icon for a new random ID, or the cross icon to delete the random ID and enter a value manually. Repository ID The Repository ID is the unique identifier for each repository in DataCite and can't be changed. The Repository ID must start with the Member ID, followed by a dot. It can then contain only upper case letters, numbers, and at most one hyphen."
      );
  });
});
