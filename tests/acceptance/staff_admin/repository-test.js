import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  currentURL,
  visit,
  click,
  fillIn,
  // waitUntil,
  // pauseTest,
} from '@ember/test-helpers';
import { selectChoose, selectSearch } from 'ember-power-select/test-support/helpers';
import ENV from 'bracco/config/environment';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { setupQunit as setupPolly } from '@pollyjs/core';

module('Acceptance | staff_admin | repository', function(hooks) {
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
        req.headers.authorization = 'Bearer ' + ENV.STAFF_ADMIN_TOKEN;
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
      uid: 'admin',
      name: 'Admin',
      role_id: 'staff_admin',
    });
  });

  test('visiting repository DataCite Test', async function(assert) {
    await visit('/repositories/datacite.test');

    assert.equal(currentURL(), '/repositories/datacite.test');
    assert.dom('h2.work').hasText('DataCite Test Repository');
    assert.dom('li a.nav-link.active').hasText('Settings');

    assert.dom('a#edit-repository').includesText('Update Repository');
    assert.dom('a#edit-repository').hasAttribute('href', '/repositories/datacite.test/edit');
    assert.dom('a#delete-repository').includesText('Delete');
    assert.dom('a#delete-repository').hasAttribute('href', '/repositories/datacite.test/delete');
  });

  test('visiting repository DataCite Test info', async function(assert) {
    await visit('/repositories/datacite.test/info');

    assert.equal(currentURL(), '/repositories/datacite.test/info');
    assert.dom('h2.work').hasText('DataCite Test Repository');
    assert.dom('li a.nav-link.active').hasText('Info');

    // repository charts are displayed
    assert.dom('#chart-doi-title').includesText('DOIs by year');
  });

  test('visiting repository DataCite Test prefixes', async function(assert) {
    await visit('/repositories/datacite.test/prefixes');

    assert.equal(currentURL(), '/repositories/datacite.test/prefixes');
    assert.dom('h2.work').hasText('DataCite Test Repository');
    assert.dom('li a.nav-link.active').hasText('Prefixes');
    assert.dom('div#search').exists();

    // at least one prefix exists
    assert.dom('[data-test-results]').includesText('Prefixes');
    assert.dom('[data-test-prefix]').exists();
    assert.dom('div.panel.facets').exists();

    // await waitUntil(function() {
    //   return assert.dom('a#assign-prefix').includesText('Assign Prefix');
    // });
  });

  // test('visiting repository DataCite Test prefixes new', async function(assert) {
  //   await visit('/repositories/datacite.test/prefixes/new');

  //   assert.equal(currentURL(), '/repositories/datacite.test/prefixes/new');
  //   assert.dom('h2.work').hasText('DataCite Test Repository');
  //   assert.dom('li a.nav-link.active').hasText('Prefixes');
  //   assert.dom('h3.edit').hasText('Assign Prefix');

  //   // assign prefix 10.24413
  //   await selectSearch('#provider-prefix-add', '10.2');
  //   await selectChoose('#provider-prefix-add', '10.24413');
  //   await click('button[type=submit]');
  //   await visit('/repositories/datacite.test/prefixes'); // instead of waiting extra step to enable delete prefix 10.24413 test to pass
  // });

  // test('delete prefix 10.24413 that was just assigned', async function(assert) {
  //   await visit('/repositories/datacite.test/prefixes/10.24413/delete');

  //   assert.equal(currentURL(), '/repositories/datacite.test/prefixes/10.24413/delete');
  //   assert.dom('h2.work').hasText('DataCite Test Repository');
  //   assert.dom('li a.nav-link.active').hasText('Prefixes');
  //   assert.dom('div.alert.alert-danger').hasText('Are you sure you want to remove prefix 10.24413 from this repository?');
  //   await click('button#prefix-delete');

  //   // assert.equal(currentURL(), '/repositories/datacite.test/prefixes');
  //   // assert.dom('*').doesNotIncludeText('10.24413');
  // });


  test('visiting repository DataCite Test dois', async function(assert) {
    await visit('/repositories/datacite.test/dois');

    assert.equal(currentURL(), '/repositories/datacite.test/dois');
    assert.dom('h2.work').hasText('DataCite Test Repository');
    assert.dom('li a.nav-link.active').hasText('DOIs');
    assert.dom('div#search').exists();

    // at least one doi exists
    assert.dom('[data-test-results]').includesText('DOIs');
    assert.dom('[data-test-doi]').exists();
    assert.dom('div.panel.facets').exists();

    // admin can add dois
    assert.dom('a#new-doi').includesText('Create (Form)');
    assert.dom('a#new-doi').hasAttribute('href', '/repositories/datacite.test/dois/new');
    assert.dom('a#upload-doi').includesText('Create (File Upload)');
    assert.dom('a#upload-doi').hasAttribute('href', '/repositories/datacite.test/dois/upload');
    assert.dom('a#transfer-dois').includesText('Transfer');
    assert.dom('a#transfer-dois').hasAttribute('href', '/repositories/datacite.test/transfer');
  });

  test('new repository form', async function(assert) {
    assert.expect(23);

    await visit('/providers/datacite/repositories/new');

    assert.equal(currentURL(), '/providers/datacite/repositories/new');
    assert.dom('h2.work').hasText('DataCite');
    assert.dom('div.tab-content').exists();

    assert.dom('input#repository-id-field').exists();
    assert.dom('div#client-type').exists();
    assert.dom('input#globus-uuid-field').exists();
    assert.dom('input#salesforce-id-field').exists();
    assert.dom('div#re3data').exists();
    assert.dom('input#name-field').exists();
    assert.dom('input#alternate-name-field').exists();
    assert.dom('input#system-email-field').exists();

    assert.dom('input#service-contact-given-name').exists();
    assert.dom('input#service-contact-family-name').exists();
    assert.dom('input#service-contact-email').exists();

    assert.dom('textarea#description-field').exists();
    assert.dom('input#url-field').exists();
    assert.dom('div#language').exists();
    assert.dom('div#software').exists();
    assert.dom('textarea#domains-field').exists();
    assert.dom('div#repository-type').exists();
    assert.dom('div#certificate').exists();
    assert.dom('input#is-active-field').exists();

    assert.dom('button#add-repository').includesText('Add Repository');
  });

  test('editing repository AWI form', async function(assert) {
    assert.expect(23);

    await visit('/repositories/datacite.test/edit');

    assert.equal(currentURL(), '/repositories/datacite.test/edit');
    assert.dom('h2.work').hasText('DataCite Test Repository');
    assert.dom('div.tab-content').exists();

    assert.dom('input#repository-id-field').exists();
    assert.dom('div#client-type').exists();
    assert.dom('input#globus-uuid-field').exists();
    assert.dom('input#salesforce-id-field').exists();
    assert.dom('div#re3data').exists();
    assert.dom('input#name-field').exists();
    assert.dom('input#alternate-name-field').exists();
    assert.dom('input#system-email-field').exists();

    assert.dom('input#service-contact-given-name').exists();
    assert.dom('input#service-contact-family-name').exists();
    assert.dom('input#service-contact-email').exists();

    assert.dom('textarea#description-field').exists();
    assert.dom('input#url-field').exists();
    assert.dom('div#language').exists();
    assert.dom('div#software').exists();
    assert.dom('div#repository-type').exists();
    assert.dom('div#certificate').exists();
    assert.dom('textarea#domains-field').exists();
    assert.dom('input#is-active-field').exists();

    assert.dom('button#update-repository').includesText('Update Repository');
  });

  test('update repository description', async function(assert) {
    await visit('/repositories/datacite.test/edit');
    assert.dom('textarea#description-field').exists();
    let desc = 'datacite' + Math.round(Math.random() * 1000).toString();
    await fillIn('textarea#description-field', desc);
    await click('button#update-repository');

    await visit('/repositories/datacite.test');
    assert.dom('h2.work').hasText('DataCite Test Repository');
    assert.dom('p#description').hasText(desc);
    // await pauseTest();
  });

  test('editing repository DataCite Test password form', async function(assert) {
    await visit('/repositories/datacite.test/change');

    assert.equal(currentURL(), '/repositories/datacite.test/change');
    assert.dom('h2.work').hasText('DataCite Test Repository');
    assert.dom('div.tab-content').exists();

    assert.dom('input#password-input-field').exists();
    assert.dom('input#confirm-password-input-field').exists();

    assert.dom('button[type=submit]').includesText('Set Password');
  });

  test('transfer repository DataCite Test ', async function(assert) {
    await visit('/repositories/datacite.test/change');

    await visit('/repositories/datacite.test/transfer-repository');
    assert.dom('*').containsText('DataCite Consortium');

    assert.equal(currentURL(), '/repositories/datacite.test/transfer-repository');
    assert.dom('h3.edit').hasText('Transfer Repository');

    await selectSearch('[data-test-transfer-select]', 'American University');
    await selectChoose('[data-test-transfer-select]', 'American University');
    assert.dom('[data-test-transfer-select]').includesText('American University');

    await click('[data-test-transfer-button]');
    assert.dom('*').containsText('American University');
  });

  test('editing repository DataCite Test delete form', async function(assert) {
    await visit('/repositories/datacite.test/delete');

    assert.equal(currentURL(), '/repositories/datacite.test/delete');
    assert.dom('h2.work').hasText('DataCite Test Repository');
    assert.dom('div.tab-content').exists();

    assert.dom('div.alert-danger').hasText('You need to transfer all DOIs to another repository before you can delete the DATACITE.TEST repository.');

    assert.dom('input#confirm-symbol-field').doesNotExist();
    assert.dom('button#delete').doesNotExist();
  });
});
