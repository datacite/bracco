import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit } from '@ember/test-helpers';
import ENV from 'bracco/config/environment';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { setupQunit as setupPolly } from '@pollyjs/core';

module('Acceptance | organization_admin | admin', function (hooks) {
  setupPolly(hooks, {
    matchRequestsBy: {
      headers: {
        exclude: ['authorization']
      }
    }
  });
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    const { server } = this.polly;

    server.any().on('request', (req) => {
      if (req.url !== 'https://api.stage.datacite.org/token') {
        req.headers.authorization = 'Bearer ' + ENV.ORGANIZATION_ADMIN_TOKEN;
      }
    });

    server.any().on('beforePersist', (req, recording) => {
      /* we only want to perform this task when recording */
      if (req.action !== 'record') {
        return;
      }

      /* filter out authorization tokens */
      recording.request.headers = recording.request.headers.filter(
        ({ name }) => name !== 'authorization'
      );
    });

    await authenticateSession({
      uid: 'datacite',
      name: 'DataCite',
      role_id: 'provider_admin',
      provider_id: 'datacite'
    });
  });

  // test('is logged in', async function(assert) {
  //   await visit('/');

  //   assert.dom('a#account_menu_link').hasText('DATACITE');
  // });

  // test('visiting homepage', async function(assert) {
  //   await visit('/');

  //   assert.equal(currentURL(), '/providers/datacite');
  //   assert.dom('h2.work').hasText('DataCite');
  // });

  // // the following pages require authentication. Redirects to provider homepage otherwise
  // test('visiting info', async function(assert) {
  //   await visit('/info');

  //   assert.equal(currentURL(), '/providers/datacite');
  //   assert.dom('h2.work').hasText('DataCite');
  // });

  // test('visiting providers', async function(assert) {
  //   await visit('/providers');

  //   assert.equal(currentURL(), '/providers/datacite');
  //   assert.dom('h2.work').hasText('DataCite');
  // });

  // test('visiting repositories', async function(assert) {
  //   await visit('/repositories');

  //   assert.equal(currentURL(), '/providers/datacite');
  //   assert.dom('h2.work').hasText('DataCite');
  // });

  // test('visiting prefixes', async function(assert) {
  //   await visit('/prefixes');

  //   assert.equal(currentURL(), '/providers/datacite');
  //   assert.dom('h2.work').hasText('DataCite');
  // });

  // test('visiting prefix 10.80225', async function(assert) {
  //   await visit('/prefixes/10.80225');

  //   assert.equal(currentURL(), '/prefixes/10.80225');
  //   assert.dom('div.alert-warning').includesText('The page was not found.');
  // });
});
