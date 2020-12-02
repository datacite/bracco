import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | repository transfer', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    this.set('model', make('repository'));

    await render(hbs`{{repository-transfer model=model}}`);

    assert
      .dom('*')
      .hasText(
        'Transfer Repository Member/Consortium Transfer this repository to another member/consortium. It can take up to one hour for the transfer to complete. Transfer Repository Cancel'
      );

    // Template block usage:
    await render(hbs`
      {{#repository-transfer model=model}}
        
      {{/repository-transfer}}
    `);

    assert
      .dom('*')
      .hasText(
        'Transfer Repository Member/Consortium Transfer this repository to another member/consortium. It can take up to one hour for the transfer to complete. Transfer Repository Cancel'
      );
  });
});
