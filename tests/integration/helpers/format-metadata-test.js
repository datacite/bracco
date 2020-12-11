import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('helper:format-metadata', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.set('metadata', {
      publicationYear: '2018',
      resourceTypeGeneral: 'Dataset',
      resourceType: 'CSV',
      container: { title: 'Lincoln Data Repository' },
      publisher: 'Lincoln University',
      version: '1.0'
    });

    await render(hbs`{{format-metadata metadata}}`);

    assert
      .dom(this.element)
      .hasText('Version 1.0 of CSV published 2018 via Lincoln Data Repository');
  });

  test('it renders publisher', async function (assert) {
    this.set('metadata', {
      publicationYear: '2018',
      resourceTypeGeneral: 'Dataset',
      resourceType: 'CSV',
      publisher: 'Lincoln University',
      version: '1.0'
    });

    await render(hbs`{{format-metadata metadata}}`);

    assert
      .dom(this.element)
      .hasText('Version 1.0 of CSV published 2018 via Lincoln University');
  });

  test('it renders without container', async function (assert) {
    this.set('metadata', {
      publicationYear: '2018',
      resourceTypeGeneral: 'Dataset',
      resourceType: 'CSV',
      version: '1.0'
    });

    await render(hbs`{{format-metadata metadata}}`);

    assert.dom(this.element).hasText('Version 1.0 of CSV published 2018');
  });

  test('it renders resourceTypeGeneral', async function (assert) {
    this.set('metadata', {
      publicationYear: '2018',
      resourceTypeGeneral: 'Dataset',
      version: '1.0'
    });

    await render(hbs`{{format-metadata metadata}}`);

    assert.dom(this.element).hasText('Version 1.0 of Dataset published 2018');
  });

  test('it renders without version', async function (assert) {
    this.set('metadata', {
      publicationYear: '2018',
      resourceTypeGeneral: 'Dataset'
    });

    await render(hbs`{{format-metadata metadata}}`);

    assert.dom(this.element).hasText('Dataset published 2018');
  });

  test('it renders without resourceTypeGeneral', async function (assert) {
    this.set('metadata', {
      publicationYear: '2018'
    });

    await render(hbs`{{format-metadata metadata}}`);

    assert.dom(this.element).hasText('Work published 2018');
  });

  test('it renders without input', async function (assert) {
    this.set('metadata', {});

    await render(hbs`{{format-metadata metadata}}`);

    assert.dom(this.element).hasText('Work');
  });
});
