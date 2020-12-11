import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import ENV from 'bracco/config/environment';

module('helper:content-negotiation-url', function (hooks) {
  setupRenderingTest(hooks);

  let validFormats = [
    { format: 'datacite', mimeType: 'application/vnd.datacite.datacite+xml' },
    {
      format: 'datacite_json',
      mimeType: 'application/vnd.datacite.datacite+json'
    },
    {
      format: 'crosscite_json',
      mimeType: 'application/vnd.crosscite.crosscite+json'
    },
    { format: 'schema_org', mimeType: 'application/vnd.schemaorg.ld+json' },
    { format: 'bibtex', mimeType: 'application/x-bibtex' },
    { format: 'ris', mimeType: 'application/x-research-info-systems' },
    { format: 'codemeta', mimeType: 'application/vnd.codemeta.ld+json' },
    { format: 'citeproc', mimeType: 'application/vnd.citationstyles.csl+json' },
    { format: 'jats', mimeType: 'application/vnd.jats+xml' }
  ];

  test('datacite', async function (assert) {
    let format = validFormats[0];
    this.set('hash', { doi: '10.5438/cxe5-rg55', format: format.format });

    await render(hbs`{{content-negotiation-url hash}}`);

    assert.equal(
      this.element.textContent.trim(),
      ENV.API_URL + `/dois/${format.mimeType}/10.5438/cxe5-rg55`
    );
  });

  test('datacite_json', async function (assert) {
    let format = validFormats[1];
    this.set('hash', { doi: '10.5438/cxe5-rg55', format: format.format });

    await render(hbs`{{content-negotiation-url hash}}`);

    assert.equal(
      this.element.textContent.trim(),
      ENV.API_URL + `/dois/${format.mimeType}/10.5438/cxe5-rg55`
    );
  });

  test('crosscite_json', async function (assert) {
    let format = validFormats[2];
    this.set('hash', { doi: '10.5438/cxe5-rg55', format: format.format });

    await render(hbs`{{content-negotiation-url hash}}`);

    assert.equal(
      this.element.textContent.trim(),
      ENV.API_URL + `/dois/${format.mimeType}/10.5438/cxe5-rg55`
    );
  });

  test('schema_org', async function (assert) {
    let format = validFormats[3];
    this.set('hash', { doi: '10.5438/cxe5-rg55', format: format.format });

    await render(hbs`{{content-negotiation-url hash}}`);

    assert.equal(
      this.element.textContent.trim(),
      ENV.API_URL + `/dois/${format.mimeType}/10.5438/cxe5-rg55`
    );
  });

  test('bibtex', async function (assert) {
    let format = validFormats[4];
    this.set('hash', { doi: '10.5438/cxe5-rg55', format: format.format });

    await render(hbs`{{content-negotiation-url hash}}`);

    assert.equal(
      this.element.textContent.trim(),
      ENV.API_URL + `/dois/${format.mimeType}/10.5438/cxe5-rg55`
    );
  });

  test('ris', async function (assert) {
    let format = validFormats[5];
    this.set('hash', { doi: '10.5438/cxe5-rg55', format: format.format });

    await render(hbs`{{content-negotiation-url hash}}`);

    assert.equal(
      this.element.textContent.trim(),
      ENV.API_URL + `/dois/${format.mimeType}/10.5438/cxe5-rg55`
    );
  });

  test('codemeta', async function (assert) {
    let format = validFormats[6];
    this.set('hash', { doi: '10.5438/cxe5-rg55', format: format.format });

    await render(hbs`{{content-negotiation-url hash}}`);

    assert.equal(
      this.element.textContent.trim(),
      ENV.API_URL + `/dois/${format.mimeType}/10.5438/cxe5-rg55`
    );
  });

  test('citeproc', async function (assert) {
    let format = validFormats[7];
    this.set('hash', { doi: '10.5438/cxe5-rg55', format: format.format });

    await render(hbs`{{content-negotiation-url hash}}`);

    assert.equal(
      this.element.textContent.trim(),
      ENV.API_URL + `/dois/${format.mimeType}/10.5438/cxe5-rg55`
    );
  });

  test('jats', async function (assert) {
    let format = validFormats[8];
    this.set('hash', { doi: '10.5438/cxe5-rg55', format: format.format });

    await render(hbs`{{content-negotiation-url hash}}`);

    assert.equal(
      this.element.textContent.trim(),
      ENV.API_URL + `/dois/${format.mimeType}/10.5438/cxe5-rg55`
    );
  });

  test('unknown format', async function (assert) {
    this.set('hash', {
      doi: '10.5438/cxe5-rg55',
      format: 'application/x-excel'
    });

    await render(hbs`{{content-negotiation-url hash}}`);

    assert.equal(
      this.element.textContent.trim(),
      ENV.API_URL + '/dois/application/vnd.schemaorg.ld+json/10.5438/cxe5-rg55'
    );
  });

  test('default', async function (assert) {
    this.set('hash', { doi: '10.5438/cxe5-rg55' });

    await render(hbs`{{content-negotiation-url hash}}`);

    assert.equal(
      this.element.textContent.trim(),
      ENV.API_URL + '/dois/application/vnd.schemaorg.ld+json/10.5438/cxe5-rg55'
    );
  });
});
