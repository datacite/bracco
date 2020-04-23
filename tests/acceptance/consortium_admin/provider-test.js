import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  currentURL,
  visit,
  click,
} from '@ember/test-helpers';
import ENV from 'bracco/config/environment';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { setupQunit as setupPolly } from '@pollyjs/core';

module('Acceptance | consortium_admin | provider', function(hooks) {
  setupPolly(hooks, {
    matchRequestsBy: {
      headers: {
        exclude: [ 'authorization' ],
      },
    },
  });
  setupApplicationTest(hooks);

  hooks.beforeEach(async function() {
    const { server } = this.polly;

    server.any().on('request', (req) => {
      if (req.url !== 'https://api.test.datacite.org/token') {
        req.headers.authorization = 'Bearer ' + ENV.CONSORTIUM_ADMIN_TOKEN;
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
      uid: 'dc',
      name: 'DataCite Consortium',
      role_id: 'consortium_admin',
      provider_id: 'dc',
    });
  });

  test('visiting provider DC', async function(assert) {
    await visit('/providers/dc');

    assert.equal(currentURL(), '/providers/dc');
    assert.dom('h2.work').hasText('DataCite Consortium');
    assert.dom('li a.nav-link.active').hasText('Settings');

    assert.dom('a#set-password-provider').includesText('Set Password');
    assert.dom('a#edit-provider').includesText('Update Member');
    assert.dom('a#delete-provider').doesNotExist();
  });

  test('visiting provider DC info', async function(assert) {
    await visit('/providers/dc/info');

    assert.equal(currentURL(), '/providers/dc/info');
    assert.dom('h2.work').hasText('DataCite Consortium');
    assert.dom('li a.nav-link.active').hasText('Info');

    // consortium charts are displayed
    assert.dom('#chart-organization-title').includesText('Organizations by year');
    assert.dom('#chart-repository-title').includesText('Repositories by year');
    assert.dom('#chart-doi-title').includesText('DOIs by year');
  });

  test('going to provider DC edit form', async function(assert) {
    await visit('/providers/dc');

    assert.equal(currentURL(), '/providers/dc');
    assert.dom('a#edit-provider').includesText('Update Member');

    await click('a#edit-provider');

    assert.equal(currentURL(), '/providers/dc/edit');
    assert.dom('h2.work').hasText('DataCite Consortium');
    assert.dom('input#member-id-field').exists();
  });

  test('visiting provider DC repositories', async function(assert) {
    await visit('/providers/dc/repositories');

    assert.equal(currentURL(), '/providers/dc/repositories');
    assert.dom('h2.work').hasText('DataCite Consortium');
    assert.dom('a.nav-link.active').hasText('Repositories');

    // at least one repository exists
    assert.dom('[data-test-results]').includesText('Repositories');
    assert.dom('[data-test-repository]').exists();
    assert.dom('div.panel.facets').exists();

    // consortium members can't add repositories here
    // (need to go to consortium organization first)
    assert.dom('a#add-repository').doesNotExist();
  });

  test('visiting provider DataCite repositories', async function(assert) {
    await visit('/providers/datacite/repositories');

    assert.equal(currentURL(), '/providers/datacite/repositories');
    assert.dom('h2.work').hasText('DataCite');
    assert.dom('a.nav-link.active').hasText('Repositories');
    assert.dom('div#search').exists();

    // at least one repository exists
    assert.dom('[data-test-results]').includesText('Repositories');
    assert.dom('[data-test-repository]').exists();
    assert.dom('div.panel.facets').exists();

    // provider can add repository
    assert.dom('a#add-repository').includesText('Add Repository');
  });

  test('visiting provider DC dois', async function(assert) {
    await visit('/providers/dc/dois');

    assert.equal(currentURL(), '/providers/dc/dois');
    assert.dom('h2.work').hasText('DataCite Consortium');
    assert.dom('li a.nav-link.active').hasText('DOIs');
    assert.dom('div#search').exists();

    // at least one doi exists
    assert.dom('[data-test-results]').includesText('DOIs');
    assert.dom('[data-test-doi]').exists();
    assert.dom('div.panel.facets').exists();

    // consortium member can't add dois here (or via consortium organization or repository)
    assert.dom('a#new-doi').doesNotExist();
    assert.dom('a#upload-doi').doesNotExist();
    assert.dom('a#transfer-dois').doesNotExist();
  });

  // test('visiting specific doi managed by provider', async function(assert) {
  //   await visit('/providers/dc/dois');

  //   // first DOI in list
  //   await click('h3.work:first-child a');

  //   assert.dom('a#transfer-doi').includesText('Transfer DOI');
  //   assert.dom('a#edit-doi').doesNotExist();
  //   assert.dom('a#modify-doi').doesNotExist();
  //   assert.dom('a#delete-doi').doesNotExist();
  // });

  test('visiting provider DC prefixes', async function(assert) {
    await visit('/providers/dc/prefixes');

    assert.equal(currentURL(), '/providers/dc/prefixes');
    assert.dom('h2.work').hasText('DataCite Consortium');
    assert.dom('li a.nav-link.active').hasText('Prefixes');
    assert.dom('div#search').exists();

    // at least one prefix exists
    assert.dom('[data-test-results]').includesText('Prefixes');
    assert.dom('[data-test-prefix]').exists();
    assert.dom('div.panel.facets').exists();
  });
});
