import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  currentURL,
  visit,
  click,
  // fillIn,
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
  });

  test('visiting provider DC settings', async function(assert) {
    await visit('/providers/dc/settings');

    assert.equal(currentURL(), '/providers/dc/settings');
    assert.dom('h2.work').hasText('DataCite Consortium');
    assert.dom('li a.nav-link.active').hasText('Settings');
    assert.dom('button#edit-provider').includesText('Update Account');
    assert.dom('button#delete-provider').doesNotExist();
  });

  test('editing provider DC settings', async function(assert) {
    await visit('/providers/dc/settings');
    await click('button#edit-provider');

    assert.equal(currentURL(), '/providers/dc/settings');
    // assert.dom('h2.work').hasText('DataCite Consortium');
    // assert.dom('a.nav-link.active').hasText('Settings');
    // assert.dom('button#edit-provider').doesNotExist();
    // assert.dom('button#delete-provider').doesNotExist();

    // await fillIn('input#provider-name-field', 'DataCite Consortium');
    // await click('button#cancel');

    // assert.equal(currentURL(), '/providers/dc/settings');
    // assert.dom('h2.work').hasText('DataCite Consortium');
    // assert.dom('a.nav-link.active').hasText('Settings');
  });

  test('visiting provider DC repositories', async function(assert) {
    await visit('/providers/dc/repositories');

    assert.equal(currentURL(), '/providers/dc/repositories');
    assert.dom('h2.work').hasText('DataCite Consortium');
    assert.dom('a.nav-link.active').hasText('Repositories');

    // consortium members can't add repositories
    assert.dom('button#add-repository').doesNotExist();
  });

  test('visiting provider DC dois', async function(assert) {
    await visit('/providers/dc/dois');

    assert.equal(currentURL(), '/providers/dc/dois');
    assert.dom('h2.work').hasText('DataCite Consortium');
    assert.dom('li a.nav-link.active').hasText('DOIs');
    assert.dom('a#create-doi').doesNotExist();
    assert.dom('a#upload-doi').doesNotExist();

    // TODO should list DOIs
  });

  // test('visiting specific doi managed by provider', async function(assert) {
  //   await visit('/providers/dc/dois');

  //   // TODO should list DOIs

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
    // assert.dom('li a.nav-link.active').hasText('Prefixes');
  });
});
