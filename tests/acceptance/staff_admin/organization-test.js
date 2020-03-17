import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  currentURL,
  visit,
  // click,
  // fillIn,
  // pauseTest,
} from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';

module('Acceptance | staff_admin | organization', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function() {
    await authenticateSession({
      uid: 'admin',
      name: 'Admin',
      role_id: 'staff_admin',
    });
  });

  test('visiting provider DC consortium organizations', async function(assert) {
    await visit('/providers/dc/organizations');

    assert.equal(currentURL(), '/providers/dc/organizations');
    assert.dom('h2.work').hasText('DataCite Consortium');
    assert.dom('li a.nav-link.active').hasText('Consortium Organizations');
    assert.dom('div#search').exists();

    // at least one consortium organization exists
    assert.dom('[data-test-results]').includesText('Consortium Organizations');
    assert.dom('[data-test-organization]').exists();
    assert.dom('div.panel.facets').exists();

    // consortium member can add consortium organizations
    assert.dom('a#add-organization').includesText('Add Organization');
    assert.dom('a#add-organization').hasAttribute('href', '/providers/dc/organizations/new');
  });

  test('visiting provider DC consortium organization workshop', async function(assert) {
    await visit('/providers/workshop');

    assert.equal(currentURL(), '/providers/workshop');
    assert.dom('h2.work').hasText('DataCite Training Workshop');
    assert.dom('li a.nav-link.active').hasText('Settings');

    // staff can edit or delete consortium organization
    assert.dom('a#edit-provider').includesText('Update Organization');
    assert.dom('a#edit-provider').hasAttribute('href', '/providers/workshop/edit');

    // staff can edit or delete consortium organization
    assert.dom('a#delete-provider').includesText('Delete Organization');
    assert.dom('a#delete-provider').hasAttribute('href', '/providers/workshop/delete');
  });

  test('new organization form', async function(assert) {
    assert.expect(33);

    await visit('/providers/dc/organizations/new');

    assert.equal(currentURL(), '/providers/dc/organizations/new');
    assert.dom('h2.work').hasText('DataCite Consortium');
    assert.dom('div.tab-content').exists();

    assert.dom('input#member-id-field').exists();
    assert.dom('input#name-field').exists();
    assert.dom('input#display-name-field').exists();
    assert.dom('input#system-email-field').exists();
    assert.dom('input#group-email-field').exists();
    assert.dom('input#website-field').exists();
    assert.dom('input#twitter-handle-field').exists();
    assert.dom('div#ror-id').exists();
    assert.dom('input#globus-uuid-field').exists();
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
    assert.dom('input#is-active-field').exists();

    assert.dom('button#add-organization').includesText('Add Consortium Organization');
  });

  test('editing organization DataCite form', async function(assert) {
    assert.expect(33);

    await visit('/providers/datacite/edit');

    assert.equal(currentURL(), '/providers/datacite/edit');
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
    assert.dom('input#globus-uuid-field').exists();
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
    assert.dom('input#is-active-field').exists();

    assert.dom('button#update-provider').includesText('Update Organization');
  });
});
