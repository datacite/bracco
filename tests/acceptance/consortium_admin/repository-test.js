import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  currentURL,
  visit,
  click,
  fillIn,
} from '@ember/test-helpers';
import ENV from 'bracco/config/environment';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { setupQunit as setupPolly } from '@pollyjs/core';

module('Acceptance | consortium_admin | repository', function(hooks) {
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
    await fillIn('input#account-field', 'DC');
    await fillIn('input#password-field', ENV.CONSORTIUM_ADMIN_PASSWORD);
    await click('button[type=submit]');

    await authenticateSession({
      uid: 'dc',
      name: 'DataCite Consortium',
      role_id: 'consortium_admin',
      provider_id: 'dc',
    });
  });

  test('visiting repository DataCite Test', async function(assert) {
    await visit('/repositories/datacite.test');

    assert.equal(currentURL(), '/repositories/datacite.test');
    assert.dom('h2.work').hasText('DataCite Test Repository');
    assert.dom('li a.nav-link.active').hasText('Settings');

    // consortium member can edit and delete repositories
    assert.dom('a#edit-repository').includesText('Update Repository');
    assert.dom('a#delete-repository').includesText('Delete');
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

    // one prefix exists
    assert.dom('[data-test-prefix]').includesText('10.80225');
    assert.dom('div.panel.facets').exists();
    assert.dom('[data-test-results]').doesNotExist();

    // consortium member can assign new prefix
    // assert.dom('a#assign-prefix').includesText('Assign Prefix');
  });

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

    // consortium member can't add dois, but can transfer them
    assert.dom('a#new-doi').doesNotExist();
    assert.dom('a#upload-doi').doesNotExist();
    assert.dom('a#transfer-dois').includesText('Transfer');
  });
});
