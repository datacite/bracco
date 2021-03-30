import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit } from '@ember/test-helpers';
import ENV from 'bracco/config/environment';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { setupQunit as setupPolly } from '@pollyjs/core';

module('Acceptance | consortium_admin | organization', function (hooks) {
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
        req.headers.authorization = 'Bearer ' + ENV.CONSORTIUM_ADMIN_TOKEN;
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
      uid: 'dc',
      name: 'DataCite Consortium',
      role_id: 'consortium_admin',
      provider_id: 'dc'
    });
  });

  // test('visiting provider DC consortium organizations', async function(assert) {
  //   await visit('/providers/dc/organizations');

  //   assert.equal(currentURL(), '/providers/dc/organizations');
  //   assert.dom('h2.work').hasText('DataCite Consortium');
  //   assert.dom('li a.nav-link.active').hasText('Consortium Organizations');
  //   assert.dom('div#search').exists();

  //   // at least one consortium organization exists
  //   assert.dom('[data-test-results]').includesText('Consortium Organizations');
  //   assert.dom('[data-test-organization]').exists();
  //   assert.dom('div.panel.facets').exists();

  //   // consortium member can add consortium organizations
  //   assert.dom('a#add-organization').includesText('Add Organization');
  //   assert.dom('a#add-organization').hasAttribute('href', '/providers/dc/organizations/new');
  // });

  // test('visiting provider DC consortium organization workshop', async function(assert) {
  //   await visit('/providers/workshop');

  //   assert.equal(currentURL(), '/providers/workshop');
  //   assert.dom('h2.work').hasText('DataCite Training Workshop');
  //   assert.dom('li a.nav-link.active').hasText('Settings');

  //   // consortium member can edit or delete consortium organization
  //   assert.dom('a#edit-provider').includesText('Update Organization');
  //   assert.dom('a#edit-provider').hasAttribute('href', '/providers/workshop/edit');

  //   // consortium member can edit or delete consortium organization
  //   assert.dom('a#delete-provider').includesText('Delete Organization');
  //   assert.dom('a#delete-provider').hasAttribute('href', '/providers/workshop/delete');
  // });
});
