import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | format-contact', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders email and name', async function(assert) {
    let contact = { email: 'info@example.org', givenName: 'Jack', familyName: 'Slater' };
    this.set('inputValue', contact);

    await render(hbs`{{format-contact inputValue}}`);

    assert.dom(this.element).hasText('Jack Slater');
    // assert.dom(this.element).hasAttribute('href', 'mailto:info@example.org');
  });

  test('it renders email', async function(assert) {
    let contact = { email: 'info@example.org' };
    this.set('inputValue', contact);

    await render(hbs`{{format-contact inputValue}}`);

    assert.dom(this.element).hasText('info@example.org');
    // assert.dom(this.element).hasAttribute('href', 'mailto:info@example.org');
  });

  test('it renders name', async function(assert) {
    let contact = { givenName: 'Jack', familyName: 'Slater' };
    this.set('inputValue', contact);

    await render(hbs`{{format-contact inputValue}}`);

    assert.dom(this.element).hasText('Jack Slater');
  });

  test('it renders null', async function(assert) {
    let contact = {};
    this.set('inputValue', contact);

    await render(hbs`{{format-contact inputValue}}`);

    assert.dom(this.element).hasText('');
  });
});
