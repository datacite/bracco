import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  currentURL,
  visit,
  click,
  fillIn,
} from '@ember/test-helpers';
import ENV from 'bracco/config/environment';
import { setupFactoryGuy } from 'ember-data-factory-guy';
// import { build, make, mockFindRecord } from 'ember-data-factory-guy';
import { selectChoose, selectSearch } from 'ember-power-select/test-support/helpers';

module('Acceptance | client_admin | doi', function(hooks) {
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
    await visit('/sign-in');
    await fillIn('input#account-field', 'DATACITE.TEST');
    await fillIn('input#password-field', ENV.CLIENT_ADMIN_PASSWORD);
    await click('button[type=submit]');
  });

  test('visiting dois', async function(assert) {
    await visit('/dois');

    assert.equal(currentURL(), '/repositories/datacite.test');
    assert.dom('h2.work').hasText('DataCite Test Repository');
  });

  // test('visiting specific doi', async function(assert) {
  //   await visit('/dois/10.70048%2Fe605-dg05');

  //   assert.equal(currentURL(), '/dois/10.70048%2Fe605-dg05');
  //   assert.dom('h2.work').hasText('10.70048/e605-dg05');
  // });

  // test('visiting specific doi in the Form', async function(assert) {
  //   await visit('/dois/10.70048%2Fe605-dg05/edit');

  //   assert.equal(currentURL(), '/dois/10.70048%2Fe605-dg05/edit');
  //   assert.dom('#doi-language').includesText('French');
  // });

  test('visiting the Form and selecting language', async function(assert) {
    await visit('repositories/datacite.test/dois/new');

    await selectChoose('#doi-language', 'English');
    assert.equal(currentURL(), 'repositories/datacite.test/dois/new');
    assert.dom('#doi-language').includesText('English');
  });

  test('visiting the Form and selecting subject', async function(assert) {
    await visit('repositories/datacite.test/dois/new');

    await selectSearch('[doi-subject]', 'Materials');
    await selectChoose('[doi-subject]', 'Materials engineering');

    assert.equal(currentURL(), 'repositories/datacite.test/dois/new');
    assert.dom('[doi-subject]').includesText('Materials engineering');
  });

  test('visiting the Form and adding geoLocationPlace', async function(assert) {
    await visit('repositories/datacite.test/dois/new');

    await fillIn('[data-test-geo-location-place]', 'Amsterdam, Novoravis hotel');

    assert.dom('[data-test-geo-location-place]').hasValue('Amsterdam, Novoravis hotel');
  });

  test('visiting the Form and entering new subject', async function(assert) {
    await visit('repositories/datacite.test/dois/new');

    await selectSearch('[doi-subject]', 'Optics');
    assert.dom('[doi-subject]').includesText('Search Subject The general type of the resource.');
  });

  test('visiting the Form and adding Contributor', async function(assert) {
    await visit('repositories/datacite.test/dois/new');

    await selectChoose('[doi-contributor]', 'DataCollector');
    assert.equal(currentURL(), 'repositories/datacite.test/dois/new');
    assert.dom('[doi-contributor]').includesText('DataCollector');
  });
});
