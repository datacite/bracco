import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  currentURL,
  visit,
  // click,
} from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';

module('Acceptance | staff_admin | admin', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function() {
    await authenticateSession({
      uid: 'admin',
      name: 'Admin',
      role_id: 'staff_admin',
    });
  });

  test('visiting dois', async function(assert) {
    await visit('/dois');

    assert.equal(currentURL(), '/dois');
    assert.dom('h2.work').hasText('DataCite');
    assert.dom('li a.nav-link.active').hasText('DOIs');
    assert.dom('div#search').exists();

    // at least one doi exists
    // TODO Ember-Inflector pluralizes DOI to Dois
    assert.dom('[data-test-results]').includesText('Dois');
    assert.dom('[data-test-doi]').exists();
    assert.dom('div.panel.facets').exists();

    // admin can't add dois here (needs to go to repository)
    assert.dom('a#new-doi').doesNotExist();
    assert.dom('a#upload-doi').doesNotExist();
    assert.dom('a#transfer-dois').doesNotExist();
  });

  // test('visiting dois with click', async function(assert) {
  //   await visit('/dois');

  //   // first DOI in list
  //   await click('h3.work:first-child a');

  //   assert.dom('button#edit-doi').includesText('Update DOI (Form)');
  //   assert.dom('button#modify-doi').includesText('Update DOI (File Upload)');
  // });

  // test('visiting specific doi', async function(assert) {
  //   await authenticateSession({
  //     uid: 'admin',
  //     name: 'Admin',
  //     role_id: 'staff_admin',
  //   });
  //   await visit('/dois/10.70048%2Fe605-dg05');

  //   assert.equal(currentURL(), '/dois/10.70048%2Fe605-dg05');
  //   assert.dom('h2.work').hasText('10.70048/e605-dg05');
  // });

  // test('visiting specific doi draft', async function(assert) {
  //   await authenticateSession({
  //     uid: 'admin',
  //     name: 'Admin',
  //     role_id: 'staff_admin',
  //   });
  //   await visit('/dois/10.14454%2F0sd6-bh17');

  //   assert.equal(currentURL(), '/dois/10.14454%2F0sd6-bh17');
  //   assert.dom('h2.work').hasText('10.14454/0sd6-bh17');
  // });
});
