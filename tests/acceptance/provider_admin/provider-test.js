import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';

module('Acceptance | provider_admin | provider', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting provider TIB', async function(assert) {
    await authenticateSession({
      uid: 'tib',
      name: 'Technische Informationsbibliothek',
      role_id: 'provider_admin',
      provider_id: 'tib',
    });
    await visit('/providers/tib');

    assert.equal(currentURL(), '/providers/tib');
    assert.dom('h2.work').hasText('German National Library of Science and Technology');
    assert.dom('li a.nav-link.active').hasText('Info');
  });

  test('visiting provider TIB settings', async function(assert) {
    await authenticateSession({
      uid: 'tib',
      name: 'Technische Informationsbibliothek',
      role_id: 'provider_admin',
      provider_id: 'tib'
    });
    await visit('/providers/tib/settings');

    assert.equal(currentURL(), '/providers/tib/settings');
    assert.dom('h2.work').hasText('German National Library of Science and Technology');
    assert.dom('li a.nav-link.active').hasText('Settings');
    assert.dom('button#edit-provider').includesText('Update Account');
    assert.dom('button#delete-provider').doesNotExist();
  });

  // test('editing provider TIB settings', async function(assert) {
  //   await authenticateSession({
  //     uid: 'tib',
  //     name: 'Technische Informationsbibliothek',
  //     role_id: 'provider_admin',
  //     provider_id: 'tib'
  //   });
  //   await visit('/providers/tib/settings');
  //   await click('button#edit-provider');

  //   assert.equal(currentURL(), '/providers/tib/settings');
  //   assert.dom('h2.work').hasText('German National Library of Science and Technology');
  //   assert.dom('a.nav-link.active').hasText('Settings');
  //   assert.dom('button#edit-provider').doesNotExist();
  //   assert.dom('button#delete-provider').doesNotExist();

  //   await fillIn('input#provider-name-field', 'German National Library of Science and Technology');
  //   await click('button#cancel');

  //   assert.equal(currentURL(), '/providers/tib/settings');
  //   assert.dom('h2.work').hasText('German National Library of Science and Technology');
  //   assert.dom('a.nav-link.active').hasText('Settings');
  // });

  // test('visiting provider TIB clients', async function(assert) {
  //   await authenticateSession({
  //     uid: 'tib',
  //     name: 'Technische Informationsbibliothek',
  //     role_id: 'provider_admin',
  //     provider_id: 'tib'
  //   });
  //   await visit('/providers/tib/clients');

  //   assert.equal(currentURL(), '/providers/tib/clients');
  //   assert.dom('h2.work').hasText('German National Library of Science and Technology');
  //   assert.dom('a.nav-link.active').hasText('Clients');
  //   assert.dom('button#add-client').includesText('Create Client');
  // });

  test('visiting provider TIB dois', async function(assert) {
    await authenticateSession({
      uid: 'tib',
      name: 'Technische Informationsbibliothek',
      role_id: 'provider_admin',
      provider_id: 'tib'
    });
    await visit('/providers/tib/dois');

    assert.equal(currentURL(), '/providers/tib/dois');
    assert.dom('h2.work').hasText('German National Library of Science and Technology');
    assert.dom('li a.nav-link.active').hasText('DOIs');
    assert.dom('a#create-doi').doesNotExist();
    assert.dom('a#upload-doi').doesNotExist();
  });

  // test('visiting specific doi managed by provider', async function(assert) {
  //   await authenticateSession({
  //     uid: 'tib',
  //     name: 'Technische Informationsbibliothek',
  //     role_id: 'provider_admin',
  //     provider_id: 'tib'
  //   });
  //   await visit('/providers/tib/dois');

  //   // first DOI in list
  //   await click('h3.work:first-child a');

  //   assert.dom('a#transfer-doi').includesText('Transfer DOI');
  //   assert.dom('a#edit-doi').doesNotExist();
  //   assert.dom('a#modify-doi').doesNotExist();
  //   assert.dom('a#delete-doi').doesNotExist();
  // });

  test('visiting provider TIB prefixes', async function(assert) {
    await authenticateSession({
      uid: 'tib',
      name: 'Technische Informationsbibliothek',
      role_id: 'provider_admin',
      provider_id: 'tib'
    });
    await visit('/providers/tib/prefixes');

    assert.equal(currentURL(), '/providers/tib/prefixes');
    assert.dom('h2.work').hasText('German National Library of Science and Technology');
    assert.dom('li a.nav-link.active').hasText('Prefixes');
  });
});
