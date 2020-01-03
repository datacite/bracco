import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  currentURL,
  // findAll,
  visit,
  // fillIn,
  // click,
  // typeIn,
  // waitUntil,
  // triggerKeyEvent,
  // pauseTest,
} from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { setupFactoryGuy } from 'ember-data-factory-guy';
// import { build, make, mockFindRecord } from 'ember-data-factory-guy';
// import ENV from 'bracco/config/environment';

module('Acceptance | client_admin | repository', function(hooks) {
  setupApplicationTest(hooks);
  setupFactoryGuy(hooks);

  // let goodDoi = {
  //   titles: [ 'Abhinandan: Crowds gather for Indian pilots release', 'Tornadoes kill at least 23 in Lee County, Alabama' ],
  //   creators: [ 'Teresa May', 'Billy Corgan' ],
  //   descriptions: [ 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis blandit odio. Donec justo ex, feugiat non imperdiet ut, ultrices a purus. Mauris molestie elementum finibus. Duis augue odio','Suspendisse tristique risus neque, non posuere lacus vestibulum et. Maecenas pellentesque mollis lectus, ac viverra nunc pellentesque sed. Sed nibh orci' ],
  //   publicationYear: '1990',
  //   publisher: 'the BBC',
  //   url: 'http://bbc.co.uk',
  // };

  hooks.beforeEach(async function() {
    await authenticateSession({
      uid: 'datacite.rph',
      name: 'DataCite Test RPH',
      role_id: 'client_admin',
      provider_id: 'datacite',
      client_id: 'datacite.rph',
    });
  });

  test('visiting repository RPH', async function(assert) {
    await visit('/repositories/datacite.rph');

    assert.equal(currentURL(), '/repositories/datacite.rph');
    assert.dom('h2.work').hasText('DataCite Test RPH');
    assert.dom('li a.nav-link.active').hasText('Info');

    // repository charts are displayed
    assert.dom('#chart-doi-title').includesText('DOIs by year');
  });

  test('visiting repository RPH settings', async function(assert) {
    await visit('/repositories/datacite.rph/settings');

    assert.equal(currentURL(), '/repositories/datacite.rph/settings');
    assert.dom('h2.work').hasText('DataCite Test RPH');
    assert.dom('li a.nav-link.active').hasText('Settings');
    assert.dom('button#edit-repository').includesText('Update Account');
    assert.dom('button#delete-repository').doesNotExist();
  });

  test('visiting repository RPH prefixes', async function(assert) {
    await visit('/repositories/datacite.rph/prefixes');

    assert.equal(currentURL(), '/repositories/datacite.rph/prefixes');
    assert.dom('h2.work').hasText('DataCite Test RPH');
    assert.dom('li a.nav-link.active').hasText('Prefixes');
    assert.dom('div#search').exists();

    // one prefix exists
    assert.dom('[data-test-prefix]').includesText('10.70048');
    assert.dom('div.panel.facets').exists();
    assert.dom('[data-test-results]').doesNotExist();

    // client can't assign new prefix
    assert.dom('a#assign-prefix').doesNotExist();
  });

  test('visiting repository RPH dois', async function(assert) {
    await visit('/repositories/datacite.rph/dois');

    assert.equal(currentURL(), '/repositories/datacite.rph/dois');
    assert.dom('h2.work').hasText('DataCite Test RPH');
    assert.dom('li a.nav-link.active').hasText('DOIs');
    assert.dom('div#search').exists();

    // at least one doi exists
    // TODO Ember-Inflector pluralizes DOI to Dois
    assert.dom('[data-test-results]').includesText('Dois');
    assert.dom('[data-test-doi]').exists();
    assert.dom('div.panel.facets').exists();

    // client can add dois
    assert.dom('a#new-doi').includesText('Create (Form)');
    assert.dom('a#upload-doi').includesText('Create (File Upload)');
    assert.dom('a#transfer-dois').doesNotExist();
  });
});
