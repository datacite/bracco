import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';

module('Acceptance | user | admin', function(hooks) {
  setupApplicationTest(hooks);

  test('is logged in', async function(assert) {
    await authenticateSession({
      uid: '0000-0001-6528-2027',
      name: 'Martin Fenner',
      role_id: 'user'
    });

    await visit('/');

    assert.dom('a#account_menu_link').hasText('Martin Fenner');
  });

  test('visiting homepage', async function(assert) {
    await authenticateSession({
      uid: '0000-0001-6528-2027',
      name: 'Martin Fenner',
      role_id: 'user'
    });

    await visit('/');

    assert.equal(currentURL(), '/users/0000-0001-6528-2027');
    assert.dom('h2.work').hasText('Martin Fenner');
  });

  // the following pages require authentication. Redirects to homepage otherwise
  test('visiting settings', async function(assert) {
    await authenticateSession({
      uid: '0000-0001-6528-2027',
      name: 'Martin Fenner',
      role_id: 'user'
    });

    await visit('/settings');

    assert.equal(currentURL(), '/users/0000-0001-6528-2027');
    assert.dom('h2.work').hasText('Martin Fenner');
  });

  test('visiting providers', async function(assert) {
    await authenticateSession({
      uid: '0000-0001-6528-2027',
      name: 'Martin Fenner',
      role_id: 'user'
    });

    await visit('/providers');

    assert.equal(currentURL(), '/users/0000-0001-6528-2027');
    assert.dom('h2.work').hasText('Martin Fenner');
  });

  test('visiting repositories', async function(assert) {
    await authenticateSession({
      uid: '0000-0001-6528-2027',
      name: 'Martin Fenner',
      role_id: 'user'
    });

    await visit('/repositories');

    assert.equal(currentURL(), '/users/0000-0001-6528-2027');
    assert.dom('h2.work').hasText('Martin Fenner');
  });

  test('visiting prefixes', async function(assert) {
    await authenticateSession({
      uid: '0000-0001-6528-2027',
      name: 'Martin Fenner',
      role_id: 'user'
    });

    await visit('/prefixes');

    assert.equal(currentURL(), '/users/0000-0001-6528-2027');
    assert.dom('h2.work').hasText('Martin Fenner');
  });

  test('visiting prefix 10.5038', async function(assert) {
    await authenticateSession({
      uid: '0000-0001-6528-2027',
      name: 'Martin Fenner',
      role_id: 'user'
    });

    await visit('/prefixes/10.5038');

    assert.equal(currentURL(), '/prefixes/10.5038');
    assert.dom('div.alert-warning').includesText('The page was not found.');
  });

  test('visiting dois', async function(assert) {
    await authenticateSession({
      uid: '0000-0001-6528-2027',
      name: 'Martin Fenner',
      role_id: 'user'
    });

    await visit('/dois');

    assert.equal(currentURL(), '/users/0000-0001-6528-2027');
    assert.dom('h2.work').hasText('Martin Fenner');
  });

  test('visiting specific doi', async function(assert) {
    await authenticateSession({
      uid: '0000-0001-6528-2027',
      name: 'Martin Fenner',
      role_id: 'user'
    });

    await visit('repositories/bl.sagecite/dois/10.5520%2Fsagecite-1');

    assert.equal(currentURL(), '/users/0000-0001-6528-2027');
    assert.dom('h2.work').hasText('Martin Fenner');
  });

  test('visiting users', async function(assert) {
    await authenticateSession({
      uid: '0000-0001-6528-2027',
      name: 'Martin Fenner',
      role_id: 'user'
    });

    await visit('/users');

    assert.equal(currentURL(), '/users/0000-0001-6528-2027');
    assert.dom('h2.work').hasText('Martin Fenner');
  });

  test('visiting specific user', async function(assert) {
    await authenticateSession({
      uid: '0000-0001-6528-2027',
      name: 'Martin Fenner',
      role_id: 'user'
    });

    await visit('/users/0000-0003-1419-2405');

    assert.equal(currentURL(), '/users/0000-0003-1419-2405');
    assert.dom('h2.work').hasText('Martin Fenner');
  });
});
