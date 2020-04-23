import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  currentURL,
  visit,
} from '@ember/test-helpers';
import ENV from 'bracco/config/environment';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { setupQunit as setupPolly } from '@pollyjs/core';

module('Acceptance | organization_admin | user', function(hooks) {
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
        req.headers.authorization = 'Bearer ' + ENV.ORGANIZATION_ADMIN_TOKEN;
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
      uid: 'datacite',
      name: 'DataCite',
      role_id: 'provider_admin',
      provider_id: 'datacite',
    });
  });

  test('visiting users', async function(assert) {
    await visit('/users');

    assert.equal(currentURL(), '/providers/datacite/repositories');
    assert.dom('h2.work').hasText('DataCite');
  });

  test('visiting specific user', async function(assert) {
    await visit('/users/0000-0003-1419-2405');

    assert.equal(currentURL(), '/users/0000-0003-1419-2405');
    assert.dom('h2.work').hasText('Martin Fenner');
  });
});
