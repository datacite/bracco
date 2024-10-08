import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Component | user-show', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Template block usage:
    await render(hbs`
      <UserShow>
        template block text
      </UserShow>
    `);

    assert.dom(this.element).hasText('ORCID ID');
  });
});
