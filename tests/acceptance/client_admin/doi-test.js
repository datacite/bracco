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
import { selectChoose } from 'ember-power-select/test-support/helpers';

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

  test('visiting dois', async function(assert) {
    await visit('/dois');

    assert.equal(currentURL(), '/repositories/datacite.rph');
    assert.dom('h2.work').hasText('DataCite Test RPH');
  });

  test('visiting specific doi', async function(assert) {
    await authenticateSession({
      uid: 'tib.awi',
      name: 'Alfred Wegener Institute',
      role_id: 'client_admin',
      provider_id: 'tib',
      client_id: 'tib.awi',
    });
    await visit('/dois/10.70048%2Fe605-dg05');

    assert.equal(currentURL(), '/dois/10.70048%2Fe605-dg05');
    assert.dom('h2.work').hasText('10.70048/e605-dg05');
  });

  test('visiting specific doi in the Form', async function(assert) {
    await authenticateSession({
      uid: 'datacite.rph',
      name: 'Alfred Wegener Institute',
      role_id: 'client_admin',
      provider_id: 'datacite',
      client_id: 'datacite.rph',
    });
    await visit('/dois/10.70048%2Fe605-dg05/edit');

    assert.equal(currentURL(), '/dois/10.70048%2Fe605-dg05/edit');
    assert.dom('#doi-language').includesText('French');
  });

  test('visiting the Form and selecting language', async function(assert) {
    await authenticateSession({
      uid: 'datacite.rph',
      name: 'Alfred Wegener Institute',
      role_id: 'client_admin',
      provider_id: 'datacite',
      client_id: 'datacite.rph',
    });
    await visit('repositories/datacite.rph/dois/new');

    await selectChoose('#doi-language', 'English');
    assert.equal(currentURL(), 'repositories/datacite.rph/dois/new');
    assert.dom('#doi-language').includesText('English');
  });

  test('visiting the Form and adding Contributor', async function(assert) {
    await authenticateSession({
      uid: 'datacite.rph',
      name: 'Alfred Wegener Institute',
      role_id: 'client_admin',
      provider_id: 'datacite',
      client_id: 'datacite.rph',
    });
    await visit('repositories/datacite.rph/dois/new');

    await selectChoose('#contributor-type', 'DataCollector');
    assert.equal(currentURL(), 'repositories/datacite.rph/dois/new');
    assert.dom('#contributor-type').includesText('DataCollector');
  });
});