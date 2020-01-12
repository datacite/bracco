import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  currentURL,
  visit,
  click,
  // fillIn,
  // pauseTest,
} from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';

module('Acceptance | consortium_admin | provider', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function() {
    await authenticateSession({
      uid: 'dc',
      name: 'DataCite Consortium',
      role_id: 'provider_admin',
      provider_id: 'dc',
    });
  });

  test('visiting provider DC', async function(assert) {
    await visit('/providers/dc');

    assert.equal(currentURL(), '/providers/dc');
    assert.dom('h2.work').hasText('DataCite Consortium');
    assert.dom('li a.nav-link.active').hasText('Info');

    // consortium charts are displayed
    assert.dom('#chart-organization-title').includesText('Organizations by year');
    assert.dom('#chart-repository-title').includesText('Repositories by year');
    assert.dom('#chart-doi-title').includesText('DOIs by year');
  });

  test('visiting provider DC settings', async function(assert) {
    await visit('/providers/dc/settings');

    assert.equal(currentURL(), '/providers/dc/settings');
    assert.dom('h2.work').hasText('DataCite Consortium');
    assert.dom('li a.nav-link.active').hasText('Settings');
    assert.dom('a#set-password-provider').includesText('Set Password');
    assert.dom('a#edit-provider').includesText('Update Member');
    assert.dom('a#delete-provider').doesNotExist();
  });

  test('going to provider DC edit form', async function(assert) {
    await visit('/providers/dc/settings');

    assert.equal(currentURL(), '/providers/dc/settings');
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

    // TODO consortium member should see all repositories
    assert.dom('.alert-warning').hasText('No repositories found.');
    assert.dom('div.panel.facets').doesNotExist();

    // consortium members can't add repositories
    assert.dom('a#add-repository').doesNotExist();
  });

  test('visiting provider DC dois', async function(assert) {
    await visit('/providers/dc/dois');

    assert.equal(currentURL(), '/providers/dc/dois');
    assert.dom('h2.work').hasText('DataCite Consortium');
    assert.dom('li a.nav-link.active').hasText('DOIs');
    assert.dom('div#search').exists();

    // TODO consortium member should see all dois
    assert.dom('.alert-warning').hasText('No DOIs found.');
    assert.dom('div.panel.facets').doesNotExist();

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

    // TODO consortium member should see all prefixes
    assert.dom('.alert-warning').hasText('No prefixes found.');
    assert.dom('div.panel.facets').exists();

    // consortium member can assign new prefix
    assert.dom('a#assign-prefix').includesText('Assign Prefix');
  });
});
