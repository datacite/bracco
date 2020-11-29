import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit } from '@ember/test-helpers';
import ENV from 'bracco/config/environment';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { setupQunit as setupPolly } from '@pollyjs/core';

module('Acceptance | client_admin | provider', function (hooks) {
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
        req.headers.authorization = 'Bearer ' + ENV.CLIENT_ADMIN_TOKEN;
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
      uid: 'datacite.test',
      name: 'DataCite Test Repository',
      role_id: 'client_admin',
      provider_id: 'datacite',
      client_id: 'datacite.test'
    });
  });

  test('visiting provider DataCite info', async function (assert) {
    await visit('/providers/datacite/info');

    assert.equal(currentURL(), '/repositories/datacite.test');
    assert.dom('h2.work').hasText('DataCite Test Repository');
  });

  test('visiting provider DataCite repositories', async function (assert) {
    await visit('/providers/datacite/repositories');

    assert.equal(currentURL(), '/repositories/datacite.test');
    assert.dom('h2.work').hasText('DataCite Test Repository');
  });

  test('visiting provider DataCite prefixes', async function (assert) {
    await visit('/providers/datacite/prefixes');

    assert.equal(currentURL(), '/repositories/datacite.test');
    assert.dom('h2.work').hasText('DataCite Test Repository');
  });

  test('visiting provider DataCite dois', async function (assert) {
    await visit('/providers/datacite/dois');

    assert.equal(currentURL(), '/repositories/datacite.test');
    assert.dom('h2.work').hasText('DataCite Test Repository');
  });
});
