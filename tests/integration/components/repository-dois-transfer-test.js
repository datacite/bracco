import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render } from '@ember/test-helpers';

module('Integration | Component | repository dois transfer', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    this.set('model', make('repository'));

    await render(hbs`{{repository-dois-transfer model=this.model}}`);

    assert
      .dom('*')
      .hasText(
        'Transfer DOIs Repository Transfer all DOIs to this repository. It can take up to one hour for the transfer to complete. Transfer DOIs Cancel'
      );

    // Template block usage:
    await render(hbs`
      <RepositoryDoisTransfer @model={{this.model}}>
        
      </RepositoryDoisTransfer>
    `);

    assert
      .dom('*')
      .hasText(
        'Transfer DOIs Repository Transfer all DOIs to this repository. It can take up to one hour for the transfer to complete. Transfer DOIs Cancel'
      );
  });
});
