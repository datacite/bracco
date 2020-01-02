import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  currentURL,
  visit,
  // click,
  // fillIn,
} from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';

module('Acceptance | staff_admin | provider', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function() {
    await authenticateSession({
      uid: 'admin',
      name: 'Admin',
      role_id: 'staff_admin',
    });
  });

  test('visiting provider TIB', async function(assert) {
    await visit('/providers/tib');

    assert.equal(currentURL(), '/providers/tib');
    assert.dom('h2.work').hasText('German National Library of Science and Technology');
    assert.dom('li a.nav-link.active').hasText('Info');
  });

  test('visiting provider TIB settings', async function(assert) {
    await visit('/providers/tib/settings');

    assert.equal(currentURL(), '/providers/tib/settings');
    assert.dom('h2.work').hasText('German National Library of Science and Technology');
    assert.dom('a.nav-link.active').hasText('Settings');
    assert.dom('button#edit-provider').includesText('Update Member');
    assert.dom('button#delete-provider').includesText('Delete Member');
  });

  // test('editing provider TIB settings', async function(assert) {
  //   await visit('/providers/tib/settings');
  //   await click('button#edit-provider');

  //   assert.equal(currentURL(), '/providers/tib/settings');
  //   assert.dom('h2.work').hasText('German National Library of Science and Technology');
  //   assert.dom('button#edit-provider').doesNotExist();

  //   await fillIn('input#provider-name-field', 'German National Library of Science and Technology');
  //   await click('button#cancel');

  //   assert.equal(currentURL(), '/providers/tib/settings');
  //   assert.dom('h2.work').hasText('German National Library of Science and Technology');
  //   assert.dom('a.nav-link.active').hasText('Settings');
  // });

  test('visiting provider TIB repositories', async function(assert) {
    await visit('/providers/tib/repositories');

    assert.equal(currentURL(), '/providers/tib/repositories');
    assert.dom('h2.work').hasText('German National Library of Science and Technology');
    assert.dom('a.nav-link.active').hasText('Repositories');
    assert.dom('button#add-repository').includesText('Add Repository');
  });

  test('visiting provider TIB dois', async function(assert) {
    await visit('/providers/tib/dois');

    assert.equal(currentURL(), '/providers/tib/dois');
    assert.dom('h2.work').hasText('German National Library of Science and Technology');
    assert.dom('li a.nav-link.active').hasText('DOIs');
    assert.dom('button#add-doi').doesNotExist();
  });

  // test('visiting provider TIB prefixes', async function(assert) {
  //   await visit('/providers/tib/prefixes');

  //   assert.equal(currentURL(), '/providers/tib/prefixes');
  //   assert.dom('h2.work').hasText('German National Library of Science and Technology');
  //   assert.dom('li a.nav-link.active').hasText('Prefixes');
  // });
});
