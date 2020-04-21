import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  currentURL,
  visit,
  click,
  fillIn,
  // waitUntil,
  // findAll,
  // pauseTest,
} from '@ember/test-helpers';
import ENV from 'bracco/config/environment';
import { setupFactoryGuy } from 'ember-data-factory-guy';
// import { build, make, mockFindRecord } from 'ember-data-factory-guy';
import { selectChoose } from 'ember-power-select/test-support/helpers';
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
  //   assert.dom('h2.work').hasText('10.80225/da52-7919');
  //   assert.dom('#doi-language').includesText('Select Language');
  // });

  test('visiting the form and selecting language', async function(assert) {
    await visit('repositories/datacite.test/dois/new');

    await selectChoose('#doi-language', 'English');
    assert.equal(currentURL(), 'repositories/datacite.test/dois/new');
    assert.dom('#doi-language').includesText('English');
  });

  // test('visiting the form and selecting subject', async function(assert) {
  //   await visit('repositories/datacite.test/dois/new');

  //   await selectSearch('[doi-subject]', 'Materials');
  //   await selectChoose('[doi-subject]', 'Materials engineering');

  //   assert.equal(currentURL(), 'repositories/datacite.test/dois/new');
  //   assert.dom('[doi-subject]').includesText('Materials engineering');
  // });

  // test('visiting the form and adding geoLocationPlace', async function(assert) {
  //   await visit('repositories/datacite.test/dois/new');

  //   await fillIn('[data-test-geo-location-place]', 'Amsterdam, Novoravis hotel');

  //   assert.dom('[data-test-geo-location-place]').hasValue('Amsterdam, Novoravis hotel');
  // });

  // test('visiting the form and entering new subject', async function(assert) {
  //   await visit('repositories/datacite.test/dois/new');

  //   await selectSearch('[doi-subject]', 'Optics');
  //   assert.dom('[doi-subject]').includesText('Subject from the OECD Fields of Science OR fill in to create a keyword Subject, keyword, classification code, or key phrase describing the resource.');
  // });

  // test('visiting the form and adding contributor', async function(assert) {
  //   await visit('repositories/datacite.test/dois/new');

  //   await selectChoose('[doi-contributor]', 'Data collector');
  //   assert.equal(currentURL(), 'repositories/datacite.test/dois/new');
  //   assert.dom('[doi-contributor]').includesText('Data collector');
  // });

  // test('visiting the Form and adding format, version and size', async function(assert) {
  //   await visit('repositories/datacite.test/dois/new');
  //   await fillIn('[data-test-format]','json');
  //   await fillIn('[data-test-size]','5kb');
  //   // await fillIn('[data-test-version]','67');

  //   // // NOTE: fillIn matches with hasValue but not with includesText
  //   assert.equal(currentURL(), 'repositories/datacite.test/dois/new');
  //   assert.dom('[data-test-format]').hasValue('json');
  //   assert.dom('[data-test-size]').hasValue('5kb');
  //   // assert.dom('[data-test-version]').hasValue('67');
  // });

  // test('visiting the Form and adding Alternate Identfier', async function(assert) {
  //   await visit('repositories/datacite.test/dois/new');
  //   await fillIn('[data-test-alternate-identifier]','https://doi.org/10.70048/rph240519');
  //   await selectChoose('[data-test-alternate-identifier-type]','DOI');

  //   // NOTE: fillIn matches with hasValue but not with includesText
  //   assert.equal(currentURL(), 'repositories/datacite.test/dois/new');
  //   assert.dom('[data-test-alternate-identifier]').hasValue('https://doi.org/10.70048/rph240519');
  //   assert.dom('[data-test-alternate-identifier-type]').includesText('DOI');
  // });

  /*  test('update draft doi', async function(assert) {
    await visit('repositories/datacite.test/dois/10.80225%2Ffjva-vj63/edit');
    await fillIn('input#url-field', 'https://support.datacite.org/docs/doi-states');
    await click('button#doi-update');
    await pauseTest();

    assert.equal(currentURL(), 'repositories/datacite.test/dois/10.80225%2Ffjva-vj63/');
    assert.dom('input#url-field').hasValue('https://support.datacite.org/docs/doi-states');
  });

  test('create draft doi', async function(assert) {
    await visit('repositories/datacite.test/dois/new');
    let suffix = '2pwf-ry88';
    await fillIn('input#suffix-field', suffix);

    await click('button#doi-create');

    assert.equal(currentURL(), '/dois/10.80225%2F' + suffix);
    assert.dom('h2.work').hasText('10.80225/2pwf-ry88');
  });

  // delete the draft doi that was just created
  test('delete draft doi', async function(assert) {
    await visit('dois/10.80225%2F2pwf-ry88/delete');
    await fillIn('input#confirm-doi-field', '10.80225%2F2pwf-ry88');
    await click('button#delete-doi');

    assert.equal(currentURL(), '/repositories/datacite.test/dois');
    assert.dom('h2.work').hasText('DataCite Test Repository');
  }); */
  // test('visiting the Form and adding related Identifier', async function(assert) {

  //   await visit('repositories/datacite.test/dois/new');
  //   await fillIn('[data-test-related-identifier]','10.70048/rph240519');
  //   await selectChoose('[data-test-related-relation-type]', 'HasMetadata');
  //   await fillIn('[data-test-related-scheme-uri]','https://schema.datacite.org/meta/kernel-4.3/doc/DataCite-MetadataKernel_v4.3.pdf');
  //   await fillIn('[data-test-related-scheme-type]','XML');

  //   assert.equal(currentURL(), 'repositories/datacite.test/dois/new');
  //   assert.dom('[data-test-related-identifier]').hasValue('10.70048/rph240519');
  //   assert.dom('[data-test-related-identifier-type]').includesText('DOI');
  //   assert.dom('[data-test-related-scheme-uri]').hasValue('https://schema.datacite.org/meta/kernel-4.3/doc/DataCite-MetadataKernel_v4.3.pdf');
  //   assert.dom('[data-test-related-scheme-type]').hasValue('XML');
  // });

  // test('visiting the Form and adding funding References', async function(assert) {
  //   // when running on travis This Test can take too much time because it call the Crossref API and the selector might not find the element
  //   await visit('repositories/datacite.test/dois/new');
  //   await selectSearch('[data-test-funder-name]', 'Action for M.E.');
  //   await selectChoose('[data-test-funder-name]', 'Action for M.E.');
  //   await fillIn('[data-test-funder-identifier]', 'http://dx.doi.org/10.13039/501100001982');
  //   await selectChoose('[data-test-funder-identifier-type]', 'Crossref Funder ID');
  //     await fillIn('[data-test-award-number]', 'G2342342');
  //     await fillIn('[data-test-award-uri]', 'https://schema.datacite.org/meta/kernel-4');

  //     assert.dom('[data-test-funder-name]').hasValue('Action for M.E.');
  //     assert.dom('[data-test-funder-identifier]').hasValue('http://dx.doi.org/10.13039/501100001982');
  //     assert.dom('[data-test-funder-identifier-type]').includesText('Crossref Funder ID × The type of funder identifier.');
  //     assert.dom('[data-test-award-number]').hasValue('G2342342');
  //     assert.dom('[data-test-award-uri]').hasValue('https://schema.datacite.org/meta/kernel-4');
  // });

  // test('visiting the Form and adding rights', async function(assert) {
  //   // when running on travis This Test can take too much time because it call the List and the selector might not find the element
  //   await visit('repositories/datacite.test/dois/new');
  //   await selectSearch('[data-test-rights]', 'Attribution Ass');
  //   await selectChoose('[data-test-rights]', 'Attribution Assurance License');
  //   await fillIn('[data-test-rights-uri]', 'http://spdx.org/licenses/AA.json');

  //   assert.dom('[data-test-rights]').includesText('Attribution Assurance License');
  //   assert.dom('[data-test-rights-uri]').hasValue('http://spdx.org/licenses/AA.json');
  // });
});
