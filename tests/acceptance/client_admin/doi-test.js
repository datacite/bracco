import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  currentURL,
  visit,
  fillIn,
  click,
  // waitUntil,
  // findAll,
  // pauseTest,
} from '@ember/test-helpers';
import ENV from 'bracco/config/environment';
import { selectChoose, selectSearch } from 'ember-power-select/test-support/helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { setupQunit as setupPolly } from '@pollyjs/core';

module('Acceptance | client_admin | doi', function(hooks) {
  setupPolly(hooks, {
    matchRequestsBy: {
      headers: {
        exclude: [ 'authorization' ],
      },
    },
    // recordFailedRequests: true,
  });
  setupApplicationTest(hooks);

  hooks.beforeEach(async function() {
    const { server } = this.polly;

    server.any().on('request', (req) => {
      if (req.url !== 'https://api.stage.datacite.org/token') {
        req.headers.authorization = 'Bearer ' + ENV.CLIENT_ADMIN_TOKEN;
      }
    });

    server.any().on('beforePersist', (req, recording) => {
      /* we only want to perform this task when recording */
      if (req.action !== 'record') {
        return;
      }

      /* filter out authorization tokens */
      recording.request.headers = recording.request.headers.filter(({ name }) => name !== 'authorization');
    });

    await authenticateSession({
      uid: 'datacite.test',
      name: 'DataCite Test Repository',
      role_id: 'client_admin',
      provider_id: 'datacite',
      client_id: 'datacite.test',
    });
  });

  test('visiting dois', async function(assert) {
    await visit('/repositories/datacite.test/dois');

    assert.equal(currentURL(), '/repositories/datacite.test/dois');
    assert.dom('h2.work').hasText('DataCite Test Repository');
  });

  test('visiting repository DataCite Test info', async function(assert) {
    await visit('/repositories/datacite.test/info');

    assert.equal(currentURL(), '/repositories/datacite.test/info');
    assert.dom('h2.work').hasText('DataCite Test Repository');
  });

  test('visiting repository DataCite Test prefixes', async function(assert) {
    await visit('/repositories/datacite.test/prefixes');

    assert.equal(currentURL(), '/repositories/datacite.test/prefixes');
    assert.dom('h2.work').hasText('DataCite Test Repository');
  });

  test('visiting repository DataCite Test dois', async function(assert) {
    await visit('/repositories/datacite.test/dois');

    assert.equal(currentURL(), '/repositories/datacite.test/dois');
    assert.dom('h2.work').hasText('DataCite Test Repository');
  });

  test('visiting specific doi', async function(assert) {
    await visit('/dois/10.80225%2Fda52-7919');

    assert.equal(currentURL(), '/dois/10.80225%2Fda52-7919');
    assert.dom('h2.work').hasText('10.80225/da52-7919');
  });

  // test('visiting the form for a specific doi', async function(assert) {
  //   await visit('/dois/10.80225%2Fda52-7919/edit');

  //   assert.equal(currentURL(), '/dois/10.80225%2Fda52-7919/edit');
  //   // assert.dom('h2.work').hasText('10.80225/da52-7919');
  //   // assert.dom('#doi-language').includesText('Select Language');
  // });

  test('visiting the form and adding url', async function(assert) {
    await visit('repositories/datacite.test/dois/new');

    assert.equal(currentURL(), 'repositories/datacite.test/dois/new');
    await fillIn('#url-field', 'https://example.org');
    assert.dom('#url-field').hasValue('https://example.org');

    await click('button#doi-create');
  });

  test('visiting the form and adding creator', async function(assert) {
    await visit('repositories/datacite.test/dois/new');

    assert.equal(currentURL(), 'repositories/datacite.test/dois/new');
    await fillIn('[data-test-name]', 'Miller, Elizabeth');
    assert.dom('[data-test-name]').hasValue('Miller, Elizabeth');

    await click('#toggle-creators');
    assert.dom('#toggle-creators').includesText('Show 1 creator');

    await click('button#doi-create');
  });

  test('visiting the form and selecting title', async function(assert) {
    await visit('repositories/datacite.test/dois/new');

    assert.equal(currentURL(), 'repositories/datacite.test/dois/new');
    await fillIn('[data-test-title]', 'The title');
    assert.dom('[data-test-title]').hasValue('The title');

    await click('#toggle-titles');
    assert.dom('#toggle-titles').includesText('Show 1 title');

    await click('button#doi-create');
  });

  test('visiting the form and adding publisher', async function(assert) {
    await visit('repositories/datacite.test/dois/new');

    assert.equal(currentURL(), 'repositories/datacite.test/dois/new');
    await fillIn('#publisher-field', 'DataCite');
    assert.dom('#publisher-field').hasValue('DataCite');

    await click('button#doi-create');
  });

  test('visiting the form and adding publication year', async function(assert) {
    await visit('repositories/datacite.test/dois/new');

    assert.equal(currentURL(), 'repositories/datacite.test/dois/new');
    await fillIn('#publication-year-field', '2020');
    assert.dom('#publication-year-field').hasValue('2020');

    await click('button#doi-create');
  });

  test('visiting the form and adding resource type general', async function(assert) {
    await visit('repositories/datacite.test/dois/new');

    assert.equal(currentURL(), 'repositories/datacite.test/dois/new');
    await selectChoose('#resource-type-general', 'Text');
    assert.dom('#resource-type-general').includesText('Text');

    // await fillIn('#resource-type', 'JournalArticle');
    // assert.dom('#resource-type-field').hasValue('JournalArticle');

    await click('button#doi-create');
  });

  test('visiting the form and selecting language', async function(assert) {
    await visit('repositories/datacite.test/dois/new');

    assert.equal(currentURL(), 'repositories/datacite.test/dois/new');
    await selectChoose('#doi-language', 'English');
    assert.dom('#doi-language').includesText('English');

    await click('button#doi-create');
  });

  // test('visiting the form and selecting subject', async function(assert) {
  //   await visit('repositories/datacite.test/dois/new');

  //   assert.equal(currentURL(), 'repositories/datacite.test/dois/new');
  //   await click('#add-subject');
  //   await selectSearch('[doi-subject]', 'Materials');
  //   await selectChoose('[doi-subject]', 'Materials engineering');
  //   assert.dom('[doi-subject]').includesText('Materials engineering');

  //   await click('#toggle-subjects');
  //   assert.dom('#toggle-subjects').includesText('Show 1 subject');

  //   await click('button#doi-create');
  // });

  test('visiting the form and adding geoLocationPlace', async function(assert) {
    await visit('repositories/datacite.test/dois/new');

    assert.equal(currentURL(), 'repositories/datacite.test/dois/new');
    await click('#add-geolocation');
    await fillIn('[data-test-geo-location-place]', 'Amsterdam, Novoravis hotel');

    assert.dom('[data-test-geo-location-place]').hasValue('Amsterdam, Novoravis hotel');

    await click('#toggle-geolocations');
    assert.dom('#toggle-geolocations').includesText('Show 1 geolocation');

    await click('button#doi-create');
  });

  test('visiting the form and entering new subject', async function(assert) {
    await visit('repositories/datacite.test/dois/new');

    await click('#add-subject');
    await selectSearch('[doi-subject]', 'Optics');
    assert.dom('[doi-subject]').includesText('Search Subject from the OECD Fields of Science and Technology (FOS) OR create a new keyword The default subject scheme is provided by the OECD Fields of Science and Technology (FOS).');
  });

  test('visiting the form and adding contributor', async function(assert) {
    await visit('repositories/datacite.test/dois/new');

    assert.equal(currentURL(), 'repositories/datacite.test/dois/new');
    await click('#add-contributor');
    await selectChoose('[doi-contributor]', 'Data collector');
    assert.dom('[doi-contributor]').includesText('Data collector');

    await click('#toggle-contributors');
    assert.dom('#toggle-contributors').includesText('Show 1 contributor');

    await click('button#doi-create');
  });

  test('visiting the form and adding version', async function(assert) {
    await visit('repositories/datacite.test/dois/new');

    assert.equal(currentURL(), 'repositories/datacite.test/dois/new');
    await fillIn('#version-field','67');
    assert.dom('#version-field').hasValue('67');

    await click('button#doi-create');
  });

  // test('visiting the form and adding format', async function(assert) {
  //   await visit('repositories/datacite.test/dois/new');

  //   assert.equal(currentURL(), 'repositories/datacite.test/dois/new');
  //   await click('#add-format');
  //   await fillIn('[data-test-format]','json');
  //   assert.dom('[data-test-format]').hasValue('json');

  //   await click('#toggle-formats');
  //   assert.dom('#toggle-formats').includesText('Show 1 format');

  //   await click('button#doi-create');
  // });

  // test('visiting the form and adding size', async function(assert) {
  //   await visit('repositories/datacite.test/dois/new');

  //   assert.equal(currentURL(), 'repositories/datacite.test/dois/new');
  //   await click('#add-size');
  //   await fillIn('[data-test-size]','5kb');
  //   assert.dom('[data-test-size]').hasValue('5kb');

  //   await click('#toggle-sizes');
  //   assert.dom('#toggle-sizes').includesText('Show 1 size');

  //   await click('button#doi-create');
  // });

  test('visiting the form and adding alternate identfier', async function(assert) {
    await visit('repositories/datacite.test/dois/new');

    await click('#add-alternate-identifier');
    await fillIn('[data-test-alternate-identifier]','https://doi.org/10.70048/rph240519');
    await selectChoose('[data-test-alternate-identifier-type]','DOI');

    assert.dom('[data-test-alternate-identifier]').hasValue('https://doi.org/10.70048/rph240519');
    assert.dom('[data-test-alternate-identifier-type]').includesText('DOI');

    await click('#toggle-alternate-identifiers');
    assert.dom('#toggle-alternate-identifiers').includesText('Show 1 alternate identifier');

    await click('button#doi-create');
  });

  test('update draft doi', async function(assert) {
    await visit('/dois/10.80225%2F9fxk-aa96/edit');

    assert.equal(currentURL(), '/dois/10.80225%2F9fxk-aa96/edit');
    await fillIn('input#url-field', 'https://support.datacite.org/docs/doi-states');
    await click('button#doi-update');

    // TODO click seems to not be reliable
    // assert.equal(currentURL(), '/dois/10.80225%2F9fxk-aa96');
    // assert.dom('input#url-field').hasValue('https://support.datacite.org/docs/doi-states');
  });

  // test('create draft doi', async function(assert) {
  //   await visit('/repositories/datacite.test/dois/new');

  //   assert.equal(currentURL(), '/repositories/datacite.test/dois/new');
  //   await selectChoose('#prefix-field', '10.80225');
  //   await fillIn('input#suffix-field', '2pwf-ry88');

  //   await click('button#doi-create');

  //   // TODO click seems to not be reliable
  //   // assert.equal(currentURL(), '/dois/10.80225%2F2pwf-ry88');
  //   // assert.dom('h2.work').hasText('10.80225/2pwf-ry88');
  // });

  // delete the draft doi that was just created
  // test('delete draft doi', async function(assert) {
  //   await visit('/dois/10.80225%2F2pwf-ry88/delete');

  //   assert.equal(currentURL(), '/dois/10.80225%2F2pwf-ry88/delete');
  //   await fillIn('input#confirm-doi-field', '10.80225/2pwf-ry88');
  //   await click('button#delete-doi');

  //   // TODO click seems to not be reliable
  //   // assert.equal(currentURL(), '/repositories/datacite.test/dois');
  //   // assert.dom('h2.work').hasText('DataCite Test Repository');
  // });

  test('visiting the form and adding related identifier', async function(assert) {
    await visit('/repositories/datacite.test/dois/new');

    assert.equal(currentURL(), '/repositories/datacite.test/dois/new');
    await click('#add-related-identifier');
    await fillIn('[data-test-related-identifier]','10.70048/rph240519');
    await selectChoose('[data-test-related-relation-type]', 'References');
    await selectChoose('[data-test-related-resource-type]', 'Text');

    assert.dom('[data-test-related-identifier]').hasValue('10.70048/rph240519');
    assert.dom('[data-test-related-identifier-type]').includesText('DOI');
    assert.dom('[data-test-related-relation-type]').includesText('References');
    assert.dom('[data-test-related-resource-type]').includesText('Text');

    await click('#toggle-related-identifiers');
    assert.dom('#toggle-related-identifiers').includesText('Show 1 related identifier');

    await click('button#doi-create');
  });

  // test('visiting the Form and adding funding references', async function(assert) {
  //   await visit('/repositories/datacite.test/dois/new');

  //   assert.equal(currentURL(), '/repositories/datacite.test/dois/new');
  //   await click('#add-funding-reference');
  //   await selectSearch('[data-test-funder-name]', 'Action');
  //   await selectChoose('[data-test-funder-name]', 'Action for M.E.');
  //   await fillIn('[data-test-funder-identifier]', 'http://dx.doi.org/10.13039/501100001982');
  //   await selectChoose('[data-test-funder-identifier-type]', 'Crossref Funder ID');
  //   await fillIn('[data-test-award-number]', 'G2342342');
  //   await fillIn('[data-test-award-uri]', 'https://schema.datacite.org/meta/kernel-4');

  //   assert.dom('[data-test-funder-name]').hasValue('Action for M.E.');
  //   assert.dom('[data-test-funder-identifier]').hasValue('http://dx.doi.org/10.13039/501100001982');
  //   assert.dom('[data-test-funder-identifier-type]').includesText('Crossref Funder ID × The type of funder identifier.');
  //   assert.dom('[data-test-award-number]').hasValue('G2342342');
  //   assert.dom('[data-test-award-uri]').hasValue('https://schema.datacite.org/meta/kernel-4');
  // });

  test('visiting the form and adding rights', async function(assert) {
    await visit('/repositories/datacite.test/dois/new');

    assert.equal(currentURL(), '/repositories/datacite.test/dois/new');
    await click('#add-rights');
    await selectSearch('[data-test-rights]', 'Attribution Ass');
    await selectChoose('[data-test-rights]', 'Attribution Assurance License');
    await fillIn('[data-test-rights-uri]', 'http://spdx.org/licenses/AA.json');

    assert.dom('[data-test-rights]').includesText('Attribution Assurance License');
    assert.dom('[data-test-rights-uri]').hasValue('http://spdx.org/licenses/AA.json');

    await click('#toggle-rights');
    assert.dom('#toggle-rights').includesText('Show 1 right');

    await click('button#doi-create');
  });
});
