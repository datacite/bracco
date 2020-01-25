import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';

module('Acceptance | staff_admin | repository', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function() {
    await authenticateSession({
      uid: 'admin',
      name: 'Admin',
      role_id: 'staff_admin',
    });
  });

  test('visiting repository AWI', async function(assert) {
    await visit('/repositories/tib.awi');

    assert.equal(currentURL(), '/repositories/tib.awi');
    assert.dom('h2.work').hasText('Alfred Wegener Institute');
    assert.dom('li a.nav-link.active').hasText('Info');

    // repository charts are displayed
    assert.dom('#chart-doi-title').includesText('DOIs by year');
  });

  test('visiting repository AWI settings', async function(assert) {
    await visit('/repositories/tib.awi/settings');

    assert.equal(currentURL(), '/repositories/tib.awi/settings');
    assert.dom('h2.work').hasText('Alfred Wegener Institute');
    assert.dom('li a.nav-link.active').hasText('Settings');
    assert.dom('a#edit-repository').includesText('Update Repository');
    assert.dom('a#edit-repository').hasAttribute('href', '/repositories/tib.awi/edit');
    assert.dom('a#delete-repository').includesText('Delete');
    assert.dom('a#delete-repository').hasAttribute('href', '/repositories/tib.awi/delete');
  });

  test('visiting repository RPH prefixes', async function(assert) {
    await authenticateSession({
      uid: 'admin',
      name: 'Admin',
      role_id: 'staff_admin',
    });
    await visit('/repositories/datacite.rph/prefixes');

    assert.equal(currentURL(), '/repositories/datacite.rph/prefixes');
    assert.dom('h2.work').hasText('DataCite Test RPH');
    assert.dom('li a.nav-link.active').hasText('Prefixes');
    assert.dom('div#search').exists();

    // search result title bar not shown when only one prefix
    assert.dom('[data-test-results]').doesNotExist();

    // at least one prefix exists
    assert.dom('[data-test-prefix]').exists();
    assert.dom('div.panel.facets').exists();

    // TODO admin can assign new prefix
    // assert.dom('a#assign-prefix').includesText('Assign Prefix');
  });

  test('visiting repository RPH dois', async function(assert) {
    await visit('/repositories/datacite.rph/dois');

    assert.equal(currentURL(), '/repositories/datacite.rph/dois');
    assert.dom('h2.work').hasText('DataCite Test RPH');
    assert.dom('li a.nav-link.active').hasText('DOIs');
    assert.dom('div#search').exists();

    // at least one doi exists
    assert.dom('[data-test-results]').includesText('DOIs');
    assert.dom('[data-test-doi]').exists();
    assert.dom('div.panel.facets').exists();

    // admin can add dois
    assert.dom('a#new-doi').includesText('Create (Form)');
    assert.dom('a#new-doi').hasAttribute('href', '/repositories/datacite.rph/dois/new');
    assert.dom('a#upload-doi').includesText('Create (File Upload)');
    assert.dom('a#upload-doi').hasAttribute('href', '/repositories/datacite.rph/dois/upload');
    assert.dom('a#transfer-dois').includesText('Transfer');
    assert.dom('a#transfer-dois').hasAttribute('href', '/repositories/datacite.rph/transfer');
  });

  test('new repository form', async function(assert) {
    assert.expect(23);

    await visit('/providers/tib/repositories/new');

    assert.equal(currentURL(), '/providers/tib/repositories/new');
    assert.dom('h2.work').hasText('German National Library of Science and Technology');
    assert.dom('div.tab-content').exists();

    assert.dom('input#repository-id-field').exists();
    assert.dom('div#client-type').exists();
    assert.dom('input#globus-uuid-field').exists();
    assert.dom('input#salesforce-id-field').exists();
    assert.dom('div#re3data').exists();
    assert.dom('input#name-field').exists();
    assert.dom('input#alternate-name-field').exists();
    assert.dom('input#system-email-field').exists();

    assert.dom('input#service-contact-given-name').exists();
    assert.dom('input#service-contact-family-name').exists();
    assert.dom('input#service-contact-email').exists();

    assert.dom('textarea#description-field').exists();
    assert.dom('input#url-field').exists();
    assert.dom('div#language').exists();
    assert.dom('div#software').exists();
    assert.dom('textarea#domains-field').exists();
    assert.dom('div#repository-type').exists();
    assert.dom('div#certificate').exists();
    assert.dom('input#is-active-field').exists();

    assert.dom('button#add-repository').includesText('Add Repository');
  });

  test('editing repository AWI form', async function(assert) {
    assert.expect(21);

    await visit('/repositories/tib.awi/edit');

    assert.equal(currentURL(), '/repositories/tib.awi/edit');
    assert.dom('h2.work').hasText('Alfred Wegener Institute');
    assert.dom('div.tab-content').exists();

    assert.dom('input#repository-id-field').exists();
    assert.dom('div#client-type').exists();
    assert.dom('input#globus-uuid-field').exists();
    assert.dom('input#salesforce-id-field').exists();
    assert.dom('div#re3data').exists();
    assert.dom('input#name-field').exists();
    assert.dom('input#alternate-name-field').exists();
    assert.dom('input#system-email-field').exists();

    assert.dom('input#service-contact-given-name').exists();
    assert.dom('input#service-contact-family-name').exists();
    assert.dom('input#service-contact-email').exists();

    assert.dom('textarea#description-field').exists();
    assert.dom('input#url-field').exists();
    assert.dom('div#language').exists();
    assert.dom('div#software').exists();
    assert.dom('textarea#domains-field').exists();
    assert.dom('input#is-active-field').exists();

    assert.dom('button#update-repository').includesText('Update Repository');
  });

  test('editing repository AWI password form', async function(assert) {
    await visit('/repositories/tib.awi/change');

    assert.equal(currentURL(), '/repositories/tib.awi/change');
    assert.dom('h2.work').hasText('Alfred Wegener Institute');
    assert.dom('div.tab-content').exists();

    assert.dom('input#password-input-field').exists();
    assert.dom('input#confirm-password-input-field').exists();

    assert.dom('button[type=submit]').includesText('Set Password');
  });

  test('editing repository AWI delete form', async function(assert) {
    await visit('/repositories/tib.awi/delete');

    assert.equal(currentURL(), '/repositories/tib.awi/delete');
    assert.dom('h2.work').hasText('Alfred Wegener Institute');
    assert.dom('div.tab-content').exists();

    assert.dom('div.alert-danger').hasText('You need to transfer all DOIs to another repository before you can delete the TIB.AWI repository.');

    assert.dom('input#confirm-symbol-field').doesNotExist();
    assert.dom('button#delete').doesNotExist();
  });
});
