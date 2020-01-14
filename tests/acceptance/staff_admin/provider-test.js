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

    // provider charts are displayed
    assert.dom('#chart-repository-title').includesText('Repositories by year');
    assert.dom('#chart-doi-title').includesText('DOIs by year');
  });

  test('visiting consortium DC', async function(assert) {
    await visit('/providers/dc');

    assert.equal(currentURL(), '/providers/dc');
    assert.dom('h2.work').hasText('DataCite Consortium');
    assert.dom('li a.nav-link.active').hasText('Info');

    // consortium charts are displayed
    assert.dom('#chart-organization-title').includesText('Organizations by year');
    assert.dom('#chart-repository-title').includesText('Repositories by year');
    assert.dom('#chart-doi-title').includesText('DOIs by year');
  });

  test('visiting provider TIB settings', async function(assert) {
    await visit('/providers/tib/settings');

    assert.equal(currentURL(), '/providers/tib/settings');
    assert.dom('h2.work').hasText('German National Library of Science and Technology');
    assert.dom('a.nav-link.active').hasText('Settings');
    assert.dom('a#edit-provider').includesText('Update Member');
    assert.dom('a#delete-provider').includesText('Delete Member');
  });

  test('visiting provider TIB repositories', async function(assert) {
    await visit('/providers/tib/repositories');

    assert.equal(currentURL(), '/providers/tib/repositories');
    assert.dom('h2.work').hasText('German National Library of Science and Technology');
    assert.dom('a.nav-link.active').hasText('Repositories');
    assert.dom('div#search').exists();

    // at least one repository exists
    assert.dom('[data-test-results]').includesText('Repositories');
    assert.dom('[data-test-repository]').exists();
    assert.dom('div.panel.facets').exists();

    // admin can add repository
    assert.dom('a#add-repository').includesText('Add Repository');
  });

  test('visiting provider TIB dois', async function(assert) {
    await visit('/providers/tib/dois');

    assert.equal(currentURL(), '/providers/tib/dois');
    assert.dom('h2.work').hasText('German National Library of Science and Technology');
    assert.dom('li a.nav-link.active').hasText('DOIs');
    assert.dom('div#search').exists();

    // at least one doi exists
    assert.dom('[data-test-results]').includesText('DOIs');
    assert.dom('[data-test-doi]').exists();
    assert.dom('div.panel.facets').exists();

    // admin can't add dois here (needs to go to repository)
    assert.dom('a#new-doi').doesNotExist();
    assert.dom('a#upload-doi').doesNotExist();
    assert.dom('a#transfer-dois').doesNotExist();
  });

  test('visiting provider TIB prefixes', async function(assert) {
    await visit('/providers/tib/prefixes');

    assert.equal(currentURL(), '/providers/tib/prefixes');
    assert.dom('h2.work').hasText('German National Library of Science and Technology');
    assert.dom('li a.nav-link.active').hasText('Prefixes');
    assert.dom('div#search').exists();

    // at least one prefix exists
    assert.dom('[data-test-results]').includesText('Prefixes');
    assert.dom('[data-test-prefix]').exists();
    assert.dom('div.panel.facets').exists();

    // admin can assign new prefix
    assert.dom('a#assign-prefix').includesText('Assign Prefix');
  });

  test('new provider form', async function(assert) {
    assert.expect(48);

    await visit('/providers/new');

    assert.equal(currentURL(), '/providers/new');
    assert.dom('h2.work').hasText('DataCite');
    assert.dom('div.tab-content').exists();

    assert.dom('input#member-id-field').exists();
    assert.dom('input#name-field').exists();
    assert.dom('input#display-name-field').exists();
    assert.dom('input#system-email-field').exists();
    assert.dom('input#group-email-field').exists();
    assert.dom('input#website-field').exists();
    assert.dom('input#twitter-handle-field').exists();
    assert.dom('div#ror-id').exists();
    assert.dom('input#salesforce-id-field').exists();
    assert.dom('div#member-type').exists();
    assert.dom('div#tax-status').exists();
    assert.dom('div#country').exists();
    assert.dom('div#organization-type').exists();
    assert.dom('div#focus-area').exists();
    assert.dom('textarea#description-field').exists();

    assert.dom('input#service-contact-given-name').exists();
    assert.dom('input#service-contact-family-name').exists();
    assert.dom('input#service-contact-email').exists();
    assert.dom('input#secondary-service-contact-given-name').exists();
    assert.dom('input#secondary-service-contact-family-name').exists();
    assert.dom('input#secondary-service-contact-email').exists();
    assert.dom('input#technical-contact-given-name').exists();
    assert.dom('input#technical-contact-family-name').exists();
    assert.dom('input#technical-contact-email').exists();
    assert.dom('input#secondary-technical-contact-given-name').exists();
    assert.dom('input#secondary-technical-contact-family-name').exists();
    assert.dom('input#secondary-technical-contact-email').exists();
    assert.dom('input#voting-contact-given-name').exists();
    assert.dom('input#voting-contact-family-name').exists();
    assert.dom('input#voting-contact-email').exists();
    assert.dom('input#billing-contact-given-name').exists();
    assert.dom('input#billing-contact-family-name').exists();
    assert.dom('input#billing-contact-email').exists();
    assert.dom('input#secondary-billing-contact-given-name').exists();
    assert.dom('input#secondary-billing-contact-family-name').exists();
    assert.dom('input#secondary-billing-contact-email').exists();

    assert.dom('input#billing-information-organization-field').exists();
    assert.dom('input#billing-information-department-field').exists();
    assert.dom('textarea#billing-information-street-field').exists();
    assert.dom('input#billing-information-city-field').exists();
    assert.dom('input#billing-information-state-field').exists();
    assert.dom('input#billing-information-postcode-field').exists();
    assert.dom('div#billing-information-country').exists();
    assert.dom('input#is-active-field').exists();

    assert.dom('button#add-provider').includesText('Add Member');
  });

  test('editing provider TIB form', async function(assert) {
    assert.expect(48);

    await visit('/providers/tib/edit');

    assert.equal(currentURL(), '/providers/tib/edit');
    assert.dom('h2.work').hasText('German National Library of Science and Technology');
    assert.dom('div.tab-content').exists();

    assert.dom('input#member-id-field').exists();
    assert.dom('input#name-field').exists();
    assert.dom('input#display-name-field').exists();
    assert.dom('input#system-email-field').exists();
    assert.dom('input#group-email-field').exists();
    assert.dom('input#website-field').exists();
    assert.dom('input#twitter-handle-field').exists();
    assert.dom('div#ror-id').exists();
    assert.dom('input#salesforce-id-field').exists();
    assert.dom('div#member-type').exists();
    assert.dom('div#tax-status').exists();
    assert.dom('div#country').exists();
    assert.dom('div#organization-type').exists();
    assert.dom('div#focus-area').exists();
    assert.dom('textarea#description-field').exists();

    assert.dom('input#service-contact-given-name').exists();
    assert.dom('input#service-contact-family-name').exists();
    assert.dom('input#service-contact-email').exists();
    assert.dom('input#secondary-service-contact-given-name').exists();
    assert.dom('input#secondary-service-contact-family-name').exists();
    assert.dom('input#secondary-service-contact-email').exists();
    assert.dom('input#technical-contact-given-name').exists();
    assert.dom('input#technical-contact-family-name').exists();
    assert.dom('input#technical-contact-email').exists();
    assert.dom('input#secondary-technical-contact-given-name').exists();
    assert.dom('input#secondary-technical-contact-family-name').exists();
    assert.dom('input#secondary-technical-contact-email').exists();
    assert.dom('input#voting-contact-given-name').exists();
    assert.dom('input#voting-contact-family-name').exists();
    assert.dom('input#voting-contact-email').exists();
    assert.dom('input#billing-contact-given-name').exists();
    assert.dom('input#billing-contact-family-name').exists();
    assert.dom('input#billing-contact-email').exists();
    assert.dom('input#secondary-billing-contact-given-name').exists();
    assert.dom('input#secondary-billing-contact-family-name').exists();
    assert.dom('input#secondary-billing-contact-email').exists();

    assert.dom('input#billing-information-organization-field').exists();
    assert.dom('input#billing-information-department-field').exists();
    assert.dom('textarea#billing-information-street-field').exists();
    assert.dom('input#billing-information-city-field').exists();
    assert.dom('input#billing-information-state-field').exists();
    assert.dom('input#billing-information-postcode-field').exists();
    assert.dom('div#billing-information-country').exists();
    assert.dom('input#is-active-field').exists();

    assert.dom('button#update-provider').includesText('Update Member');
  });

  test('editing provider TIB password form', async function(assert) {
    await visit('/providers/tib/change');

    assert.equal(currentURL(), '/providers/tib/change');
    assert.dom('h2.work').hasText('German National Library of Science and Technology');
    assert.dom('div.tab-content').exists();

    assert.dom('input#password-input-field').exists();
    assert.dom('input#confirm-password-input-field').exists();

    assert.dom('button[type=submit]').includesText('Set Password');
  });

  test('editing provider TIB delete form', async function(assert) {
    await visit('/providers/tib/delete');

    assert.equal(currentURL(), '/providers/tib/delete');
    assert.dom('h2.work').hasText('German National Library of Science and Technology');
    assert.dom('div.tab-content').exists();

    assert.dom('div.alert-danger').hasText('You need to delete all repositories before you can delete the TIB provider.');

    assert.dom('input#confirm-symbol-field').doesNotExist();
    assert.dom('button#delete').doesNotExist();
  });
});
