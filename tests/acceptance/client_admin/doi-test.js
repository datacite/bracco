import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  currentURL,
  visit,
  click,
  fillIn,
} from '@ember/test-helpers';
import ENV from 'bracco/config/environment';
import { setupFactoryGuy } from 'ember-data-factory-guy';
// import { build, make, mockFindRecord } from 'ember-data-factory-guy';
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
  });
  setupApplicationTest(hooks);
  setupFactoryGuy(hooks);

  hooks.beforeEach(async function() {
    const { server } = this.polly;

    server.any().on('beforePersist', (req, recording) => {
      /* we only want to perform this task when recording */
      if (req.action !== 'record') {
        return;
      }
      /* hide password and token in oauth password grant requests */
      if (recording.request.url == 'https://api.test.datacite.org/token') {
        recording.request.postData.text = 'INFORMATION_HIDDEN';
        recording.response.content.text = 'INFORMATION_HIDDEN';
      }

      /* filter out authorization tokens */
      recording.request.headers = recording.request.headers.filter(({ name }) => name !== 'authorization');
    });

    await visit('/sign-in');
    await fillIn('input#account-field', 'DATACITE.TEST');
    await fillIn('input#password-field', ENV.CLIENT_ADMIN_PASSWORD);
    await click('button[type=submit]');

    await authenticateSession({
      uid: 'datacite.test',
      name: 'DataCite Test Repository',
      role_id: 'client_admin',
      provider_id: 'datacite',
      client_id: 'datacite.test',
    });
  });

  // let goodDoi = {
  //   titles: [ 'Abhinandan: Crowds gather for Indian pilots release', 'Tornadoes kill at least 23 in Lee County, Alabama' ],
  //   creators: [ 'Teresa May', 'Billy Corgan' ],
  //   descriptions: [ 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis blandit odio. Donec justo ex, feugiat non imperdiet ut, ultrices a purus. Mauris molestie elementum finibus. Duis augue odio','Suspendisse tristique risus neque, non posuere lacus vestibulum et. Maecenas pellentesque mollis lectus, ac viverra nunc pellentesque sed. Sed nibh orci' ],
  //   publicationYear: '1990',
  //   publisher: 'the BBC',
  //   url: 'http://bbc.co.uk',
  // };

  test('visiting dois', async function(assert) {
    await visit('/dois');

    assert.equal(currentURL(), '/repositories/datacite.test');
    assert.dom('h2.work').hasText('DataCite Test Repository');
  });

  // test('visiting specific doi', async function(assert) {
  //   await visit('/dois/10.70048%2Fe605-dg05');

  //   assert.equal(currentURL(), '/dois/10.70048%2Fe605-dg05');
  //   assert.dom('h2.work').hasText('10.70048/e605-dg05');
  // });

  // test('visiting specific doi in the Form', async function(assert) {
  //   await visit('/dois/10.70048%2Fe605-dg05/edit');

  //   assert.equal(currentURL(), '/dois/10.70048%2Fe605-dg05/edit');
  //   assert.dom('#doi-language').includesText('French');
  // });

  test('visiting the Form and selecting language', async function(assert) {
    await visit('repositories/datacite.test/dois/new');

    await selectChoose('#doi-language', 'English');
    assert.equal(currentURL(), 'repositories/datacite.test/dois/new');
    assert.dom('#doi-language').includesText('English');
  });

  test('visiting the Form and selecting subject', async function(assert) {
    await visit('repositories/datacite.test/dois/new');

    await selectSearch('[doi-subject]', 'Materials');
    await selectChoose('[doi-subject]', 'Materials engineering');

    assert.equal(currentURL(), 'repositories/datacite.test/dois/new');
    assert.dom('[doi-subject]').includesText('Materials engineering');
  });

  test('visiting the Form and adding geoLocationPlace', async function(assert) {
    await visit('repositories/datacite.test/dois/new');

    await fillIn('[data-test-geo-location-place]', 'Amsterdam, Novoravis hotel');

    assert.dom('[data-test-geo-location-place]').hasValue('Amsterdam, Novoravis hotel');
  });

  test('visiting the Form and entering new subject', async function(assert) {
    await visit('repositories/datacite.test/dois/new');

    await selectSearch('[doi-subject]', 'Optics');
    assert.dom('[doi-subject]').includesText('Search Subject from the OECD Fields of Science Subject, keyword, classification code, or key phrase describing the resource.');
  });

  test('visiting the Form and adding Contributor', async function(assert) {
    await visit('repositories/datacite.test/dois/new');

    await selectChoose('[doi-contributor]', 'DataCollector');
    assert.equal(currentURL(), 'repositories/datacite.test/dois/new');
    assert.dom('[doi-contributor]').includesText('DataCollector');
  });

  test('visiting the Form and adding Alternate Identfier', async function(assert) {

    await visit('repositories/datacite.test/dois/new');
    await fillIn('[data-test-alternate-identifier]','https://doi.org/10.70048/rph240519');
    await fillIn('[data-test-alternate-identifier-type]','DOI');

    // // NOTE: fillIn matches with hasValue but not with includesText
    assert.equal(currentURL(), 'repositories/datacite.test/dois/new');
    assert.dom('[data-test-alternate-identifier]').hasValue('https://doi.org/10.70048/rph240519');
    assert.dom('[data-test-alternate-identifier-type]').hasValue('DOI');
  });

  test('visiting the Form and adding related Identifier', async function(assert) {

    await visit('repositories/datacite.test/dois/new');
    await fillIn('[data-test-related-identifier]','10.70048/rph240519');
    await selectChoose('[data-test-related-relation-type]', 'HasMetadata');
    await fillIn('[data-test-related-scheme-uri]','https://schema.datacite.org/meta/kernel-4.3/doc/DataCite-MetadataKernel_v4.3.pdf');
    await fillIn('[data-test-related-scheme-type]','XML');

    assert.equal(currentURL(), 'repositories/datacite.test/dois/new');
    assert.dom('[data-test-related-identifier]').hasValue('10.70048/rph240519');
    assert.dom('[data-test-related-identifier-type]').includesText('DOI');
    assert.dom('[data-test-related-scheme-uri]').hasValue('https://schema.datacite.org/meta/kernel-4.3/doc/DataCite-MetadataKernel_v4.3.pdf');
    assert.dom('[data-test-related-scheme-type]').hasValue('XML');
  });

  test('visiting the Form and adding funding References', async function(assert) {

    await visit('repositories/datacite.test/dois/new');
    await selectSearch('[doi-funder-reference]', 'Action for M.E.');
    await selectChoose('[doi-funder-reference]', 'Action for M.E.');
    await fillIn('[data-test-award-number]', 'G2342342');
    await fillIn('[data-test-award-uri]', 'https://schema.datacite.org/meta/kernel-4');

    assert.dom('[data-test-funder-name]').hasValue('Action for M.E.');
    assert.dom('[data-test-funder-identifier]').hasValue('http://dx.doi.org/10.13039/501100001982');
    assert.dom('[data-test-funder-identifier-type]').includesText('Crossref Funder ID The type of the funderIdentifier.');
    assert.dom('[data-test-award-number]').hasValue('G2342342');
    assert.dom('[data-test-award-uri]').hasValue('https://schema.datacite.org/meta/kernel-4');
  });
});
