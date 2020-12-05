import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render } from '@ember/test-helpers';

module('Integration | Component | repository transfer', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    this.set('model', make('repository'));

    await render(hbs`
      <RepositoryTransfer @model={{model}} />
    `);

    assert
      .dom(this.element)
      .hasText(
        'Transfer Repository Member/Consortium Type to search... Transfer this repository to another member/consortium. It can take up to one hour for the transfer to complete. Transfer Repository Cancel'
      );
  });
});
