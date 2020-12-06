import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';

module('Integration | Component | doi media', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`{{doi-media}}`);

    assert.ok(
      /There are no media+/.test(find('*').textContent.trim()),
      'begins with "There are no media"'
    );
  });
});
