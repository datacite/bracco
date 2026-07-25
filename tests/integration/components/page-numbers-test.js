import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import EmberObject from '@ember/object';

module('Integration | Component | page-numbers', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders keyboard-accessible pagination semantics', async function (assert) {
    this.model = EmberObject.create({
      query: EmberObject.create({
        page: 1,
        size: 25
      }),
      meta: EmberObject.create({
        page: 1,
        totalPages: 3
      })
    });

    await render(hbs`<PageNumbers @model={{this.model}} @link="dois" />`);

    assert.dom('nav[aria-label="Pagination"]').exists();
    assert.dom('.arrow.prev.disabled').hasAttribute('aria-disabled', 'true');
    assert.dom('.arrow.prev.disabled a').doesNotExist();
    assert.dom('.active.page-number [aria-current="page"]').exists();
    assert.dom('.arrow.next a, .arrow.next [href]').exists();
  });
});
