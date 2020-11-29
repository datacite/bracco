import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('helper:format-creator', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders comma', async function (assert) {
    this.set('creators', [
      {
        type: 'Person',
        name: 'Empbh R. Goh',
        'given-name': 'Empbh R.',
        'family-name': 'Goh'
      },
      {
        type: 'Person',
        name: 'M. Barrgow',
        'given-name': 'M.',
        'family-name': 'Barrgow'
      },
      {
        type: 'Person',
        name: 'M. Barrgoe',
        'given-name': 'M.',
        'family-name': 'Barrgoe'
      }
    ]);

    await render(hbs`{{format-creator creators index=0 }}`);

    assert.dom('*').hasText(', ');
  });

  test('it renders ampersand', async function (assert) {
    this.set('creators', [
      {
        type: 'Person',
        name: 'Empbh R. Goh',
        'given-name': 'Empbh R.',
        'family-name': 'Goh'
      },
      {
        type: 'Person',
        name: 'M. Barrgow',
        'given-name': 'M.',
        'family-name': 'Barrgow'
      },
      {
        type: 'Person',
        name: 'M. Barrgoe',
        'given-name': 'M.',
        'family-name': 'Barrgoe'
      }
    ]);

    await render(hbs`{{format-creator creators index=1 }}`);

    assert.dom('*').hasText(' & ');
  });

  test('it renders empty space', async function (assert) {
    this.set('creators', [
      {
        type: 'Person',
        name: 'Empbh R. Goh',
        'given-name': 'Empbh R.',
        'family-name': 'Goh'
      },
      {
        type: 'Person',
        name: 'M. Barrgow',
        'given-name': 'M.',
        'family-name': 'Barrgow'
      },
      {
        type: 'Person',
        name: 'M. Barrgoe',
        'given-name': 'M.',
        'family-name': 'Barrgoe'
      }
    ]);

    await render(hbs`{{format-creator creators index=2 }}`);

    assert.dom('*').hasText('');
  });
});
