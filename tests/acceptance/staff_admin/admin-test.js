import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';

module('Acceptance | staff_admin | admin', function(hooks) {
  setupApplicationTest(hooks);

  test('is logged in', async function(assert) {
    await authenticateSession({
      uid: 'admin',
      name: 'Admin',
      role_id: 'staff_admin'
    });
    await visit('/');

    assert.dom('a#account_menu_link').hasText('ADMIN');
  });

  test('visiting homepage', async function(assert) {
    await authenticateSession({
      uid: 'admin',
      name: 'Admin',
      role_id: 'staff_admin'
    });
    await visit('/');
    
    assert.equal(currentURL(), '/');
    assert.dom('h2.work').hasText('DataCite');
    assert.dom('a.nav-link.active').hasText('Info');
  });

  // the following pages require authentication. Redirects to homepage otherwise
  test('visiting settings', async function(assert) {
    await authenticateSession({
      uid: 'admin',
      name: 'Admin',
      role_id: 'staff_admin'
    });
    await visit('/settings');

    assert.equal(currentURL(), '/settings');
    assert.dom('h2.work').hasText('DataCite');
    assert.dom('a.nav-link.active').hasText('Settings');
  });

  test('visiting providers', async function(assert) {
    await authenticateSession({
      uid: 'admin',
      name: 'Admin',
      role_id: 'staff_admin'
    });
    await visit('/providers');

    assert.equal(currentURL(), '/providers');
    assert.dom('h2.work').hasText('DataCite');
    assert.dom('a.nav-link.active').hasText('Providers');
  });

  test('visiting repositories', async function(assert) {
    await authenticateSession({
      uid: 'admin',
      name: 'Admin',
      role_id: 'staff_admin'
    });
    await visit('/repositories');

    assert.equal(currentURL(), '/repositories');
    assert.dom('h2.work').hasText('DataCite');
    assert.dom('a.nav-link.active').hasText('Repositories');
  });

  test('visiting prefixes', async function(assert) {
    await authenticateSession({
      uid: 'admin',
      name: 'Admin',
      role_id: 'staff_admin'
    });
    await visit('/prefixes');

    assert.equal(currentURL(), '/prefixes');
    assert.dom('h2.work').hasText('DataCite');
  });

  test('visiting prefix 10.5072', async function(assert) {
    await authenticateSession({
      uid: 'admin',
      name: 'Admin',
      role_id: 'staff_admin'
    });
    await visit('/prefixes/10.5072');

    assert.equal(currentURL(), '/prefixes/10.5072');
    assert.dom('div.alert-warning').includesText('The page was not found.');
  });

  test('visiting dois', async function(assert) {
    await authenticateSession({
      uid: 'admin',
      name: 'Admin',
      role_id: 'staff_admin'
    });
    await visit('/dois');

    assert.equal(currentURL(), '/dois');
    assert.dom('h2.work').hasText('DataCite');
    assert.dom('a.nav-link.active').hasText('DOIs');
  });

  // test('visiting specific doi', async function(assert) {
  //   await authenticateSession({
  //     uid: 'admin',
  //     name: 'Admin',
  //     role_id: 'staff_admin'
  //   });
  //   await visit('/dois');

  //   // first DOI in list
  //   await click('h3.work:first-child a');

  //   assert.dom('button#edit-doi').includesText('Update DOI (Form)');
  //   assert.dom('button#modify-doi').includesText('Update DOI (File Upload)');
  // });
});
